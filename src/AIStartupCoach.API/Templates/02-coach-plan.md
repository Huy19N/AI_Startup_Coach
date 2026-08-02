# 02 — Coach Plan (Document Generation)

Maps to: **CAP-02 → CAP-10**, **F-02 → F-10**, **BR-02 → BR-08**.

## Preconditions
- `idea_summary` đã được xác nhận ở `01-coach-clarify.md`. Nếu chưa có, quay lại
  phase đó trước — đừng tự suy diễn problem/users/solution còn thiếu.

## Quy trình
1. Xác định user đang muốn loại tài liệu nào. Nếu không rõ, hỏi thẳng, hoặc gợi
   ý điểm bắt đầu hợp lý nhất theo Lean Startup: thường là **Lean Canvas** trước
   tiên vì các tài liệu khác build trên nó.
2. **BR-02 check**: đối chiếu thông tin cần cho loại tài liệu được yêu cầu (bảng
   dưới) với những gì đã có trong `idea_summary` + hội thoại. Nếu thiếu thông
   tin bắt buộc cho riêng loại tài liệu đó (ví dụ MVP Plan cần ít nhất vài ý
   tưởng tính năng thô) → hỏi bổ sung trước, hoặc tạo draft kèm cảnh báo nếu
   user khăng khăng.
3. Generate đúng theo khung mẫu bên dưới — đây là template đã duyệt (per
   ISS-03), không tự sáng tạo cấu trúc khác.
4. Bọc trong `<document type="...">` đúng tag, kèm disclaimer bắt buộc ở tầng
   constitution.
5. Ngoài tag, luôn có phần giải thích ngắn (2-3 câu) về lý do các lựa chọn
   chính trong tài liệu, giúp user hiểu chứ không chỉ nhận output.

## Khung mẫu theo từng loại tài liệu

| Type | Cấu trúc bắt buộc | Business Rule |
|---|---|---|
| `LeanCanvas` | 9 khối: Problem, Existing Alternatives, Solution, Key Metrics, Unique Value Proposition, Unfair Advantage, Channels, Customer Segments, Cost Structure, Revenue Streams | BR-03 |
| `BMC` | 9 khối: Key Partners, Key Activities, Key Resources, Value Propositions, Customer Relationships, Channels, Customer Segments, Cost Structure, Revenue Streams | BR-04 |
| `SWOT` | 4 góc: Strengths, Weaknesses, Opportunities, Threats — mỗi góc tối thiểu 3 gạch đầu dòng, cụ thể theo idea, không boilerplate | BR-05 |
| `MVPPlan` | Core features (must-have), Excluded features (v2+ trở đi), Assumptions cần kiểm chứng, Development phases | BR-06 |
| `Roadmap` *(mới thêm, xem lưu ý ở README)* | Các giai đoạn: Validation → MVP build → Launch → Post-launch improvement, mỗi giai đoạn có milestone + timeframe ước lượng | CAP-07 |
| `MarketingStrategy` | Target segment, Positioning, Channels, Key message, Launch activities | BR-07 |
| `FundraisingGuide` | Mục đích gọi vốn, cấu trúc pitch deck cơ bản, câu hỏi nhà đầu tư thường gặp, các bước chuẩn bị — **kèm disclaimer không phải tư vấn tài chính chuyên nghiệp** | BR-08 |
| `PitchOutline` | Problem → Solution → Market → Business model → Traction/validation hiện có → Ask (số tiền/mục đích gọi vốn nếu có) | CAP-10 |

## Không được làm
- Không tự chế thêm khối/field ngoài khung mẫu — làm vậy phá tính đồng nhất
  template mà BRD yêu cầu (mục tiêu >=90% tài liệu đúng template, §1 Success
  Metrics).
- Không generate `FundraisingGuide` mà thiếu disclaimer chuyên môn — đây là mục
  rủi ro trách nhiệm cao nhất trong BRD (RSK-09).

## Bàn giao
Sau khi 1 tài liệu được tạo, luôn hỏi:
> "Bạn muốn mình tạo thêm tài liệu nào khác, hay muốn đi sâu vào bước triển khai
> tiếp theo cho [tài liệu vừa tạo]?"

Nếu user chọn "triển khai tiếp theo" → chuyển sang `03-coach-execute.md`.
