# Plan: AI Startup Coach — Phase 4 (Document Editor, Export, Version History)

Source: brainstorm.md (v1), constitution.md (v1.1.0)

## Spec summary
### Functional requirements
1. **FR-41 (Rich Text Editor)**: Người dùng có thể chỉnh sửa nội dung tài liệu (Lean Canvas, SWOT, etc.) bằng một trình soạn thảo trực quan (WYSIWYG) thay vì phải sửa text thuần.
2. **FR-42 (Version History)**: Hệ thống ghi nhận lịch sử các lần chỉnh sửa. Khi người dùng lưu (Save) tài liệu, một phiên bản (revision) mới được tạo và lưu trữ. Người dùng có thể xem lại danh sách các phiên bản cũ của một tài liệu.
3. **FR-43 (Export)**: Người dùng có thể tải tài liệu về máy tính dưới định dạng PDF hoặc DOCX thông qua các nút thao tác trực tiếp trên giao diện Frontend (không phụ thuộc vào server-side rendering).

### Acceptance criteria
- [ ] Mở một tài liệu sẽ hiển thị giao diện soạn thảo văn bản phong phú (in đậm, list, heading...).
- [ ] Người dùng chỉnh sửa và nhấn "Lưu" -> Gọi API thành công, DB tạo ra bản ghi lịch sử mới.
- [ ] Có nút "Lịch sử" để liệt kê và xem các phiên bản đã lưu trước đó của tài liệu.
- [ ] Bấm nút "Xuất PDF" -> Trình duyệt bật hộp thoại in/lưu PDF nội dung tài liệu.
- [ ] Bấm nút "Xuất DOCX" -> Tải xuống file `.docx` chứa nội dung đã soạn thảo.

---

## Constitution compliance check
| Principle | Status | Notes |
|---|---|---|
| 1. TDD Mandatory | ✅ Complies | Mọi entity mới (`DocumentVersion`), API endpoint, và util xuất file đều phải có Unit Test đi kèm trước khi code. |
| 2. Layered Architecture | ✅ Complies | Xây dựng theo cấu trúc chuẩn: `DocumentController` -> `IDocumentService` -> `IDocumentRepository`. |
| 8. FBA Frontend | ✅ Complies | Các component mới (`RichTextEditor`, `ExportButtons`) sẽ được tổ chức gọn gàng trong feature `chat` hoặc `documents`. |
| 9. Professional UI | ✅ Complies | Sử dụng thư viện Editor hiện đại (như Tiptap) để trải nghiệm gõ mượt mà như Notion. |

---

## Technical approach

### Backend (Database & API)
- Tạo thêm Entity `DocumentVersion` gồm: `Id`, `DocumentId` (FK), `Content` (lưu HTML/Markdown), `CreatedAt`.
- Quan hệ: Một `Document` có nhiều `DocumentVersions`.
- Logic lưu: Nội dung đầu tiên AI sinh ra sẽ là version 1. Mỗi lần user bấm Save từ UI sẽ gọi `POST /api/documents/{id}/versions` kèm nội dung mới.
- Thêm `GET /api/documents/{id}/versions` để Frontend lấy danh sách lịch sử.

### Frontend (Editor & Export)
- **Rich Text Editor**: Sử dụng `tiptap` (hiện đại, headless, rất dễ tuỳ biến UI cho React) hoặc `react-quill`. AI sinh Markdown, Frontend có thể parse Markdown thành HTML để nhét vào Tiptap, sau đó Tiptap sẽ quản lý bằng HTML.
- **Export PDF**: Dùng `react-to-print` (kích hoạt print dialog của trình duyệt, xuất PDF sắc nét và native nhất).
- **Export DOCX**: Dùng `html-to-docx` kết hợp `file-saver` để convert HTML content từ Editor sang định dạng file Word.
- **UI Version History**: Trong modal xem tài liệu, sẽ có một nút "Lịch sử". Bấm vào sẽ mở ra một sidebar nhỏ bên phải modal liệt kê timeline các lần sửa.

---

## Tasks

### Group 1: Backend Database & Entities (TDD)
- [x] **T01** — Cập nhật Entity `Document` (thêm collection `Versions`) và tạo `DocumentVersion` Entity. Cấu hình EF Core, tạo Migration & Update Database.
- [ ] **T02** — Cập nhật `IDocumentRepository`: thêm method `AddVersionAsync` và `GetVersionsAsync`. Viết tests kiểm chứng EF Core behavior.
- [ ] **T03** — Tạo `IDocumentService` / `DocumentService` để xử lý logic: khi AI tạo document mới, đồng thời tự insert version đầu tiên vào lịch sử. Khi user gọi API, tạo version tiếp theo.

### Group 2: Backend API (TDD)
- [ ] **T04** — Viết tests và implement `DocumentController` với các endpoints: `POST /api/documents/{id}/versions` và `GET /api/documents/{id}/versions`.

### Group 3: Frontend Rich Text Editor (TDD)
- [ ] **T05** — Cài đặt thư viện Editor (vd: `@tiptap/react`, `@tiptap/starter-kit`) và thư viện parse markdown (`marked` hoặc tương tự).
- [ ] **T06** — Tạo component `RichTextEditor.tsx` có thanh công cụ (Bold, Italic, List). Viết test render component.
- [ ] **T07** — Tích hợp `RichTextEditor` vào `DocumentViewer` thay thế ReactMarkdown hiện tại. Gắn sự kiện nút "Lưu" để gọi API `POST` lên backend.

### Group 4: Frontend Export & History (TDD)
- [ ] **T08** — Cài đặt các thư viện `react-to-print`, `html-to-docx`, `file-saver`.
- [ ] **T09** — Viết các tiện ích (utils) hoặc components hỗ trợ xuất file PDF và DOCX. Cập nhật test.
- [ ] **T10** — Thiết kế UI cho Version History (danh sách thời gian) trong `DocumentViewer` và liên kết với API `GET /versions`. Polish UI toàn bộ Modal.
