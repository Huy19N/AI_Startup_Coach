# Plan: AI Startup Coach — Phase 3 (Extended Startup Documents)

Source: brainstorm.md (v1), constitution.md (v1.1.0)

## Spec summary
### Functional requirements
1. **FR-31**: Hỗ trợ AI tạo thêm 5 loại tài liệu startup chuẩn: BMC (Business Model Canvas), MVP Plan, Marketing Strategy, Pitch Outline, Fundraising Guide.
2. **FR-32**: System prompt được cập nhật để hướng dẫn AI xuất ra các thẻ `<document type="...">` tương ứng cho các loại tài liệu này.
3. **FR-33**: Giao diện `DocumentViewer` hiển thị đúng icon và label (tên tiếng Việt) cho các loại tài liệu mới.
4. **FR-34**: Thêm Disclaimer "Chỉ mang tính tham khảo" vào màn hình xem chi tiết tài liệu (Document Modal) để tuân thủ Principle 6 (AI Disclaimer).

### Acceptance criteria
- [ ] Gửi yêu cầu tạo "BMC" hoặc "MVP Plan", AI trả về đúng thẻ XML và hệ thống lưu thành công vào DB.
- [ ] `DocumentViewer` hiển thị icon riêng biệt, đẹp mắt cho từng loại document mới.
- [ ] `DocumentViewer` hiển thị tên tài liệu thân thiện (vd: "Kế hoạch MVP" thay vì "MVPPlan").
- [ ] Khi click xem chi tiết tài liệu, có component Disclaimer hiển thị mờ ở cuối modal.
- [ ] Typescript definitions (`chat.types.ts`) được cập nhật để bao gồm các string literals cho các loại doc mới.

## Constitution compliance check
| Principle | Status | Notes |
|---|---|---|
| 1. TDD Mandatory | ✅ Complies | Cập nhật tests cho DocumentViewer component (frontend). Backend Regex đã generic nên không cần đổi logic cốt lõi. |
| 3. Template-Driven AI Output | ✅ Complies | Cập nhật `system-prompt.md` để enforce format các loại tài liệu mới. |
| 6. AI Disclaimer | ✅ Complies | Bổ sung Disclaimer vào Document Modal (hiện mới chỉ có ở ChatMessage). |
| 9. Professional UI | ✅ Complies | Thêm Lucide icons chuyên biệt cho từng loại tài liệu, nâng cao UX/UI. |

## Technical approach
- **Backend**:
  - Logic parsing (Regex) và entity `Document` đã được thiết kế mở (chấp nhận mọi chuỗi cho trường `Type`), nên không cần sửa code C# hay DB schema.
  - Chỉ cần sửa đổi `system-prompt.md` để liệt kê rõ các loại tài liệu AI có thể tạo và yêu cầu AI dùng đúng tên Type (vd: `BMC`, `MVPPlan`, `MarketingStrategy`, `PitchOutline`, `FundraisingGuide`).
- **Frontend**:
  - Cập nhật `chat.types.ts` để type hint (intellisense) các doc types mới.
  - Sửa `DocumentViewer.tsx`:
    - Cập nhật hàm `getDocIcon` để map các types mới với các icon phù hợp từ `lucide-react` (ví dụ: `Grid` cho BMC, `Rocket` cho MVP Plan, `Target` cho Marketing, `Presentation` cho Pitch, `DollarSign` cho Fundraising).
    - Thêm hàm `getDocLabel` để map tên tiếng Việt (ví dụ: `Kế hoạch MVP`).
    - Import và chèn `<Disclaimer />` component vào modal chi tiết của tài liệu, ở dưới cùng.
  - Viết/cập nhật unit tests cho `DocumentViewer.tsx` đảm bảo render đúng icon và disclaimer.

## Tasks

### Group 1: Backend Prompting
- [x] **T01** — Cập nhật `src/AIStartupCoach.API/Templates/system-prompt.md`: Bổ sung hướng dẫn tạo các loại tài liệu: BMC, MVPPlan, MarketingStrategy, PitchOutline, FundraisingGuide. — *Kiểm tra thủ công*.

### Group 2: Frontend UI & Types (TDD)
- [ ] **T02** — Cập nhật type `DocumentItem` trong `frontend/src/features/chat/types/chat.types.ts` để bao gồm các string literals mới.
- [ ] **T03** — Tạo/cập nhật file test `frontend/src/features/chat/components/__tests__/DocumentViewer.test.tsx` (nếu chưa có) để kiểm tra việc render icons, label tiếng Việt và Disclaimer trong modal.
- [ ] **T04** — Cập nhật `frontend/src/features/chat/components/DocumentViewer.tsx`: Thêm logic render icon, label thân thiện, và tích hợp `<Disclaimer />` vào modal theo đúng test đã viết.
