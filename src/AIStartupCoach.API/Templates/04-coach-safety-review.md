# 04 — Coach Safety Review (cổng chất lượng & an toàn trước khi trả về user)

Maps to: **RSK-01, RSK-04, RSK-07, RSK-09, BR-09, BR-10, BR-13, CON-04, CON-10,
OOS-01/02/03/04/05/09, CAP-20 (tinh thần rubric), ISS-01**.

Đây là lớp kiểm tra cuối cùng trước khi bất kỳ output nào (đặc biệt là
`<document>`) được coi là hoàn chỉnh để trả về user — tương đương cổng
review-code + security-review trong harness lập trình, nhưng áp cho nội dung
tư vấn kinh doanh thay vì code.

## Hai cách triển khai — chọn theo backend của bạn

**Cách A — Self-check trong cùng 1 lần gọi (rẻ, đơn giản, khuyên dùng để bắt
đầu):** thêm checklist dưới đây vào cuối prompt của phase đang chạy (clarify/
plan/execute), yêu cầu model tự rà lại trước khi xuất câu trả lời cuối.

**Cách B — Gọi LLM lần 2 để review draft (chắc chắn hơn, tốn thêm chi phí/độ
trễ):** sau khi `02-coach-plan.md` hoặc `03-coach-execute.md` sinh ra draft,
gửi draft đó qua một lệnh gọi riêng chỉ chứa checklist này, model trả về
`PASS` hoặc danh sách lỗi cần sửa trước khi hiển thị cho user.

> Lưu ý chi phí: BRD liệt kê RSK-03 (chi phí API tăng cao) là Medium/High —
> nếu bạn đang ở giai đoạn pilot với quota miễn phí hạn chế, bắt đầu bằng Cách
> A; chỉ chuyển sang Cách B cho các loại tài liệu "nặng ký" hơn (FundraisingGuide,
> PitchOutline — nơi rủi ro trách nhiệm cao nhất, RSK-09) khi ngân sách cho phép.

## Checklist bắt buộc

1. **Disclaimer** — tài liệu có dòng cảnh báo "chỉ tham khảo, cần kiểm chứng"
   chưa? (BR-13)
2. **Số liệu** — có con số thị trường/thống kê cụ thể nào bị nêu như sự thật đã
   kiểm chứng, thay vì gắn nhãn ước tính không? (RSK-01, CON-03, OOS-05)
3. **Ranh giới pháp lý/tài chính** — có đoạn nào đọc như tư vấn pháp lý/thuế/
   tài chính chuyên nghiệp cụ thể (không phải thông tin chung + khuyến nghị gặp
   chuyên gia) không? (BR-10, OOS-02, CON-10) — đặc biệt soi kỹ nếu type là
   `FundraisingGuide` (RSK-09).
4. **Ranh giới code** — có đoạn code sản phẩm hoàn chỉnh nào bị viết ra thay vì
   chỉ gợi ý kỹ thuật ở mức cao/no-code không? (BR-09, OOS-03)
5. **Cam kết thành công** — có câu nào ngụ ý đảm bảo ý tưởng sẽ thành công
   không? (OOS-04)
6. **Chất lượng tiếng Việt** — có đoạn nào bị dịch máy/gượng gạo không? (CON-04)
7. **Thuật ngữ** — thuật ngữ startup dùng lần đầu có giải thích kèm theo không?
   (CON-08, RSK-07)
8. **Độ cụ thể** — nội dung có tham chiếu chi tiết thực tế từ `idea_summary`
   của user, hay đọc như một template rỗng có thể áp cho bất kỳ startup nào?
   Nếu quá chung chung → đừng trả về, quay lại `01-coach-clarify.md` hỏi thêm
   chi tiết trước khi generate lại. (RSK-04)
9. **Đúng khung mẫu** — có đủ tất cả các khối bắt buộc theo bảng trong
   `02-coach-plan.md` cho đúng loại tài liệu không, không thiếu không thừa
   field? (ISS-01, mục tiêu >=90% đúng template)

## Nếu có mục fail
- Fail mục 2, 3, 4, 5 → **không được** trả nguyên văn cho user; phải sửa lại
  đoạn vi phạm trước khi xuất, không chỉ thêm disclaimer để "vá" cho qua.
- Fail mục 8 (quá chung chung) → quay lại clarify thay vì cố generate lại với
  cùng lượng thông tin.
- Fail mục 1, 6, 7, 9 → sửa trực tiếp rồi xuất, không cần hỏi lại user.

## Không phải việc của phase này
Version history, export PDF/DOCX, quota/rate-limit, quyền truy cập mentor
(CAP-11 → CAP-18) là tính năng ở tầng ứng dụng/database, không phải hành vi
hội thoại của AI — harness này không (và không nên) cố xử lý chúng bằng prompt.
