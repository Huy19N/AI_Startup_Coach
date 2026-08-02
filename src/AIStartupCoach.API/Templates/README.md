# AI Startup Coach — Prompt Harness

Bộ 5 file thay thế cho `system-prompt.md` hiện tại của dự án AI Startup Coach.
Khác với harness lập trình (SDD-Hybrid) — đây **không phải plugin cho coding
agent**, mà là kiến trúc system prompt runtime cho chính sản phẩm của bạn (AI
nói chuyện trực tiếp với sinh viên). Không có cơ chế "skill tự trigger" như
Claude Code — backend của bạn phải tự quyết định nạp file nào, dựa trên trạng
thái hội thoại.

## Cấu trúc

```
coach-harness/
├── 00-constitution.md        # luôn nạp, mọi turn — persona, format, ranh giới, disclaimer
├── 01-coach-clarify.md       # phase: làm rõ ý tưởng
├── 02-coach-plan.md          # phase: sinh tài liệu (8 loại)
├── 03-coach-execute.md       # phase: biến kế hoạch thành hành động
└── 04-coach-safety-review.md # cổng kiểm tra trước khi trả kết quả cuối
```

## Bám sát BRD — bảng truy vết

| File | Capability ID | Business Rule | Risk liên quan |
|---|---|---|---|
| 00-constitution | CAP-19 | BR-01, BR-02, BR-09, BR-10, BR-13 | RSK-01, RSK-02, CON-03/04/08/10 |
| 01-coach-clarify | CAP-01 | BR-01 | — |
| 02-coach-plan | CAP-02→CAP-10 | BR-02→BR-08 | RSK-09 |
| 03-coach-execute | CAP-07 (tinh thần) | — | RSK-02 |
| 04-coach-safety-review | CAP-20 (tinh thần rubric) | BR-09, BR-10, BR-13 | RSK-01, RSK-04, RSK-07, RSK-09 |

Những capability **không** nằm trong harness này vì là tính năng
app/database, không phải hành vi hội thoại AI: CAP-11 (Document Editor),
CAP-12 (Export), CAP-13 (Version History), CAP-14 (Workspace), CAP-15 (Mentor
Review), CAP-16 (Admin Template), CAP-17 (Feedback), CAP-18 (Quota).

## Kiến trúc tích hợp — 2 lựa chọn

### Cách A — Ghép prompt theo `stage` (khuyên dùng để bắt đầu)

Backend cần lưu một field `stage` cho mỗi project workspace (không phải cho AI
tự nhớ — AI không có state giữa các request). Enum tối thiểu:

```
clarifying   -> nạp 00-constitution + 01-coach-clarify
planning     -> nạp 00-constitution + 02-coach-plan
executing    -> nạp 00-constitution + 03-coach-execute
```

Chuyển `stage`:
- `clarifying -> planning`: khi response của AI chứa tag `<idea_summary>` VÀ
  user đã xác nhận (ví dụ bấm nút "Xác nhận ý tưởng" trên UI) — đừng tự động
  chuyển chỉ vì thấy tag xuất hiện, vì bước 3 của `01-coach-clarify.md` yêu cầu
  AI phải hỏi xác nhận trước.
- `planning -> executing`: khi user bấm nút kiểu "Bước tiếp theo là gì" thay vì
  "Tạo tài liệu khác".
- Có thể quay ngược `executing -> planning` hoặc `planning -> clarifying` bất
  cứ lúc nào user chủ động muốn sửa ý tưởng gốc hoặc tạo thêm tài liệu khác —
  đây là vòng lặp, không phải đường thẳng một chiều.

Pseudocode ghép prompt (framework-agnostic):

```js
const constitution = readFile('00-constitution.md');
const phaseFile = {
  clarifying: '01-coach-clarify.md',
  planning:   '02-coach-plan.md',
  executing:  '03-coach-execute.md',
}[project.stage];

const systemPrompt = constitution + '\n\n---\n\n' + readFile(phaseFile);
```

`04-coach-safety-review.md` không nằm trong bảng trên vì nó không phải một
`stage` — xem Cách B.

### Cách B — Safety review là lệnh gọi thứ 2 (chắc chắn hơn, tốn thêm chi phí)

Sau khi có draft response từ Cách A (đặc biệt khi output chứa `<document>`),
gọi thêm 1 lần nữa chỉ với `04-coach-safety-review.md` làm system prompt và
draft làm input, nhận về `PASS` hoặc danh sách lỗi cần sửa. Nếu fail, gọi lại
model gốc với ghi chú lỗi để sửa trước khi trả cho user.

Cân nhắc chi phí (RSK-03 trong BRD): dùng Cách B có chọn lọc — ưu tiên cho
`FundraisingGuide` và `PitchOutline` (rủi ro trách nhiệm cao nhất, RSK-09),
còn `SWOT`/`BMC` có thể chỉ cần self-check (Cách A) để tiết kiệm chi phí trong
giai đoạn pilot.

## Việc cần làm phía frontend

`02-coach-plan.md` thêm type `Roadmap` — nếu frontend đang parse cứng theo 7
type cũ (`LeanCanvas`, `BMC`, `SWOT`, `MVPPlan`, `MarketingStrategy`,
`PitchOutline`, `FundraisingGuide`), cần thêm case xử lý `Roadmap` để không bị
render lỗi hoặc bỏ sót khi user yêu cầu tạo roadmap (CAP-07).

## Việc cần làm phía admin/nội dung (không thuộc phạm vi prompt)

BRD có 2 issue đang mở ảnh hưởng trực tiếp tới chất lượng harness này:
- **ISS-01**: chưa có rubric chính thức để đánh giá Lean Canvas/BMC/SWOT/MVP
  Plan — `04-coach-safety-review.md` mục 9 hiện chỉ kiểm tra "đủ field", chưa
  kiểm tra "field đó tốt hay không". Khi rubric chính thức có, nên bổ sung vào
  checklist.
- **ISS-03**: template cho từng loại tài liệu trong `02-coach-plan.md` là bản
  mình soạn dựa trên framework chuẩn phổ biến (Lean Canvas 9 khối, BMC 9 khối
  theo Osterwalder...) — cần đối chiếu với template chính thức mà team/mentor
  phê duyệt trước khi dùng production, vì đây là item đang "In progress" trong
  BRD.

## Migration từ system-prompt.md

Giữ `system-prompt.md` cũ lại làm tài liệu tham chiếu, nhưng ngừng dùng trực
tiếp trong request — toàn bộ nội dung của nó đã được phân rã vào
`00-constitution.md` (phần rules chung) và các phase file (phần logic theo
tình huống cụ thể) để dễ bảo trì và mở rộng hơn khi BRD có thêm capability mới.
