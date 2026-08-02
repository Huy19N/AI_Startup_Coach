# Plan: AI Startup Coach — Phase 5 (Frontend UI) & Phase 6 (UI Polish & FE Features)

Source: brainstorm.md (v1), constitution.md (v1.1.0)

## Spec summary
### Functional requirements
1. **FR-61 (AuthStore & Roles/Quota Parsing)**: Decode JWT claims để lấy Roles (`Admin`, `Mentor`, `Student`) và `AiQuota`. Hiển thị badge AI Quota còn lại trên Navbar/Sidebar.
2. **FR-62 (Admin Template Management UI)**: Giao diện `/admin/templates` bảo vệ bởi `AdminGuard`. Cho phép Admin xem danh sách, tạo mới, chỉnh sửa System Prompt cho từng loại tài liệu và toggle `IsActive`.
3. **FR-63 (Mentor Review & Commenting UI)**: Tích hợp Drawer "Nhận xét & Review" trong `DocumentViewer`. Hiển thị danh sách nhận xét, cho phép Mentor/Student thêm comment mới theo real-time hoặc polling nhẹ.
4. **FR-64 (Document Feedback System UI)**: Thêm bộ đánh giá Like/Dislike + ô nhập phản hồi văn bản ở chân trang `DocumentViewer`. Gửi dữ liệu về backend `POST /api/documents/{id}/feedback`.
5. **FR-65 (Rich Text Editor & Client-Side Export)**: Nâng cấp `RichTextEditor` (WYSIWYG với TipTap/Toolbar), hỗ trợ định dạng trực quan. Xử lý xuất file DOCX và PDF hoàn toàn ở Frontend.
6. **FR-66 (UI Final Polish - Sky Blue & White Theme + Animations)**: Áp dụng Theme chuẩn Xanh Sky & Trắng, Glassmorphism, Micro-animations, hiệu ứng hover/smooth transitions, responsive layout và AI Disclaimer nổi bật.

### Acceptance criteria
- [ ] Parse được roles & AI quota từ JWT trong `authStore`. Navbar hiển thị AI Quota (vd: `AI Quota: 49/50`).
- [ ] Admin đăng nhập có menu "Quản lý Prompt" dẫn tới `/admin/templates`, hiển thị danh sách templates và modal/form sửa System Prompt. User thường truy cập vào `/admin/templates` sẽ bị redirect về `/`.
- [x] Trong `DocumentViewer`, tab "Comments" cho phép xem danh sách nhận xét và gửi nhận xét mới.
- [x] Trong `DocumentViewer`, khu vực Feedback ở cuối tài liệu hỗ trợ bấm Thumbs Up/Down và gửi FeedbackText về API thành công.
- [x] `RichTextEditor` hiển thị thanh công cụ trực quan (Bold, Italic, Bullet List, Heading, Align). Xuất DOCX/PDF chạy mượt mà ở trình duyệt.
- [x] Giao diện có màu Xanh Sky (`sky-500` / `#0284c7`) phối hợp với background Trắng tinh tế, hiệu ứng hiệu chỉnh animation chuyển trang/modal mượt mà.

---

## Constitution compliance check
| Principle | Status | Notes |
|---|---|---|
| 1. TDD Mandatory | ✅ Complies | Mọi Component & Store mới đều đi kèm Unit Tests (Jest + React Testing Library). |
| 4. Authentication Required | ✅ Complies | Route `/admin/templates` được bảo vệ bởi Role-based Protected Route (`AdminGuard`). |
| 6. AI Disclaimer | ✅ Complies | Mọi vị trí hiển thị tài liệu/chat AI đều đính kèm component `Disclaimer`. |
| 8. FBA Frontend | ✅ Complies | Module `admin` được tách riêng trong `src/features/admin/`, update các feature `auth`, `chat`. |
| 9. Professional UI | ✅ Complies | Áp dụng phối màu Xanh Sky Sky & White, typography chuẩn, hiệu ứng animations hiện đại. |
| 10. Clean Code & No Hardcode | ✅ Complies | API endpoints và constants được định nghĩa tập trung trong `constants.ts`. |

---

## Technical approach

### Frontend Architecture & Styling
- **Theme**: Cấu hình CSS variables trong `index.css` cho `--primary` (Sky Blue `#0284c7`), `--background` (`#ffffff`), `--muted` (`#f8fafc`), glassmorphism backdrop blurs và CSS keyframe animations.
- **Auth & JWT Parsing**: Sử dụng `jwt-decode` hoặc regex base64 decode để trích xuất `role` (hoặc `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`) và `AiQuota` từ JWT Token.
- **Admin Feature (`src/features/admin/`)**:
  - `types/admin.types.ts`: PromptTemplate interfaces.
  - `services/templateAdminService.ts`: CRUD Axios calls to `/api/admin/templates`.
  - `components/AdminTemplatePage.tsx`: Data table + Modal editor cho prompt.
  - `components/AdminGuard.tsx`: Wrapper kiểm tra `user.roles.includes('Admin')`.
- **Mentor Review & Feedback (`src/features/chat/components/`)**:
  - `CommentDrawer.tsx`: Sub-component hiển thị trong `DocumentViewer` để quản lý danh sách comment.
  - `DocumentFeedback.tsx`: Sub-component nằm ở footer của document content với 2 nút Thumbs Up/Down & Popup text box.
- **Editor & Export**:
  - Nâng cấp `RichTextEditor.tsx` với TipTap starter-kit + Toolbar buttons.
  - `exportUtils.ts`: Sử dụng `html-to-docx` và `react-to-print` / `html2pdf` cho FE client-side export.

---

## Tasks

### Group 4: Frontend Auth, Quota & Admin Management
- [x] **T10** — `frontend/src/features/auth/`: Cập nhật `authStore.ts` và `auth.types.ts` để decode JWT claims (Roles, AiQuota). Cập nhật `Navbar.tsx` hiển thị badge AI Quota & Admin link nếu user có role `Admin`. Viết test cho `authStore`.
- [x] **T11** — `frontend/src/features/admin/`: Tạo feature `admin` gồm `admin.types.ts`, `templateAdminService.ts`, `AdminGuard.tsx` và `AdminTemplatePage.tsx`. Cấu hình route `/admin/templates` trong `App.tsx`. Viết unit test cho `AdminGuard` và `AdminTemplatePage`.
- [x] **T12** — `frontend/src/features/admin/components/TemplateEditModal.tsx`: Tạo modal chỉnh sửa `PromptTemplate` (SystemPrompt textarea, IsActive toggle, DocumentType select). Đấu nối API `PUT /api/admin/templates/{id}`. Viết unit test.

### Group 5: Frontend Mentor Review & Feedback System
- [x] **T13** — `frontend/src/features/chat/components/DocumentFeedback.tsx`: Tạo component Feedback (Like/Dislike buttons, text feedback input, status indicator). Tích hợp vào `DocumentViewer.tsx` và gọi API `POST /api/documents/{id}/feedback`. Viết unit test.
- [x] **T14** — `frontend/src/features/chat/components/CommentDrawer.tsx`: Tạo tab/drawer Comments trong `DocumentViewer.tsx` để xem danh sách nhận xét và gửi comment mới qua `POST /api/documents/{documentId}/comments`. Viết unit test.

### Group 6: Rich Text Editor, FE Export & UI Sky Blue Polish
- [x] **T15** — `frontend/src/shared/components/RichTextEditor.tsx`: Nâng cấp RichTextEditor với toolbar đa dạng (Headings, Bold, Italic, Bullet/Numbered List, Blockquote, Clear formatting). Cập nhật unit test.
- [x] **T16** — `frontend/src/features/chat/utils/exportUtils.ts`: Cập nhật/tối ưu hàm xuất file client-side hoàn toàn cho `.docx` và `.pdf` từ HTML content. Viết unit test cho `exportUtils`.
- [x] **T17** — `frontend/src/index.css` & UI Theme: Cấu hình bảng màu Sky Blue & White (`#0284c7`, `#e0f2fe`, `#ffffff`), thêm micro-animations (fade-in, slide-up, pulse-glow), glassmorphism hiệu ứng cho Navbar/Sidebar/Modals. Đảm bảo 100% frontend unit tests pass.
