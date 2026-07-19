# Tài liệu Yêu cầu Nghiệp vụ (BRD)

## Tên dự án: AI Startup Coach

---

## 1. Vision and Objectives

### Vision

AI Startup Coach là một trợ lý AI hỗ trợ sinh viên từ giai đoạn hình thành ý tưởng startup đến xây dựng kế hoạch MVP. Hệ thống giúp sinh viên chuyển đổi ý tưởng ban đầu thành các tài liệu kinh doanh có cấu trúc như Lean Canvas, Business Model Canvas, SWOT Analysis, MVP Plan, Product Roadmap, Marketing Strategy, Pitch Outline và hướng dẫn gọi vốn cơ bản.

Tầm nhìn của AI Startup Coach là trở thành một “mentor số” dễ tiếp cận cho sinh viên, giúp họ học tư duy khởi nghiệp nhanh hơn, chuẩn bị tài liệu startup có hệ thống hơn và giảm sự phụ thuộc hoàn toàn vào mentor trong giai đoạn đầu.

### Objectives

| Objective ID | Objective | Description |
| --- | --- | --- |
| OBJ-01 | Hỗ trợ làm rõ ý tưởng startup | Giúp sinh viên làm rõ ý tưởng ban đầu bằng cách xác định vấn đề, người dùng mục tiêu, giải pháp đề xuất và giá trị mang lại. |
| OBJ-02 | Tạo tài liệu startup tự động | Tự động tạo các tài liệu cốt lõi như Lean Canvas, Business Model Canvas, SWOT Analysis và MVP Plan. |
| OBJ-03 | Hỗ trợ lập kế hoạch MVP | Giúp sinh viên xác định tính năng cốt lõi của MVP, loại bỏ tính năng chưa cần thiết và xây dựng kế hoạch phát triển ban đầu. |
| OBJ-04 | Cung cấp định hướng marketing | Tạo chiến lược marketing cơ bản gồm phân khúc khách hàng, định vị, kênh truyền thông, thông điệp chính và hoạt động ra mắt. |
| OBJ-05 | Cung cấp hướng dẫn gọi vốn cơ bản | Giúp sinh viên hiểu cấu trúc pitch deck, mục đích gọi vốn, câu hỏi nhà đầu tư thường gặp và các bước chuẩn bị. |
| OBJ-06 | Giảm phụ thuộc vào mentor | Thay thế một phần đáng kể các hướng dẫn khởi nghiệp cơ bản lặp đi lặp lại thường do mentor đảm nhiệm. |
| OBJ-07 | Chuẩn hóa đầu ra học thuật/startup | Cung cấp đầu ra có cấu trúc phù hợp cho bài tập, cuộc thi startup, chương trình ươm tạo và mentor review. |
| OBJ-08 | Tăng khả năng tiếp cận kiến thức khởi nghiệp | Làm cho các framework startup trở nên dễ hiểu hơn với sinh viên chưa có nhiều kinh nghiệm kinh doanh. |

### Success Metrics

| Goal | User/Business Value | Metric | Target | Timeframe |
| --- | --- | --- | --- | --- |
| Tạo tài liệu startup nhanh hơn | Sinh viên tiết kiệm thời gian khi chuẩn bị bài tập hoặc tài liệu dự thi startup | Thời gian trung bình để tạo bản nháp Lean Canvas/SWOT/MVP | < 1 giờ | Ngay khi triển khai |
| Tăng khả năng tiếp cận | Sinh viên có thể nhận hướng dẫn startup mà không cần chờ mentor | Số lượng sinh viên sử dụng nền tảng | 10.000 users | 12 tháng đầu |
| Giảm tải cho mentor | Mentor giảm thời gian giải thích lại các framework startup cơ bản | Tỷ lệ hướng dẫn cơ bản được AI hỗ trợ | 60% | 6 tháng đầu |
| Tăng mức độ hài lòng | Sinh viên đánh giá nội dung AI hữu ích và dễ hiểu | Tỷ lệ user đánh giá output >= 4/5 | >= 80% | 6 tháng đầu |
| Cải thiện khả năng xác định MVP | Sinh viên xác định phạm vi MVP nhỏ hơn và khả thi hơn | Tỷ lệ MVP Plan được đánh giá là khả thi | >= 70% | 6 tháng đầu |
| Chuẩn hóa tài liệu | Đầu ra tuân theo cấu trúc template đã được phê duyệt | Tỷ lệ tài liệu sinh ra đúng template | >= 90% | 3 tháng đầu |

---

## 2. Problem Statement

### Problem Statement

Nhiều sinh viên có ý tưởng startup nhưng thiếu kiến thức kinh doanh, kinh nghiệm thực tế và hướng dẫn có cấu trúc để biến ý tưởng đó thành kế hoạch startup và MVP khả thi. Sinh viên thường chưa biết cách xác định vấn đề khách hàng, kiểm chứng giả định, xây dựng Lean Canvas, tạo Business Model Canvas, phân tích SWOT, lập kế hoạch MVP, thiết kế chiến lược marketing hoặc chuẩn bị nội dung pitching/gọi vốn cơ bản.

Hiện tại, việc hỗ trợ sinh viên thường phụ thuộc vào mentor, giảng viên hoặc các tài liệu rời rạc trên Internet. Tuy nhiên, mentor có thời gian hạn chế, còn tài liệu online thường chung chung, phân mảnh và không được cá nhân hóa theo ý tưởng cụ thể của từng nhóm. Điều này khiến sinh viên mất nhiều thời gian chuẩn bị tài liệu, tạo ra đầu ra không đồng nhất hoặc bỏ cuộc trước khi đi đến giai đoạn MVP.

### Affected Users

| User Group | Description | Pain Point |
| --- | --- | --- |
| Student Founders | Sinh viên có ý tưởng startup và muốn biến ý tưởng thành kế hoạch kinh doanh có cấu trúc | Thiếu kiến thức startup, framework và hướng dẫn từng bước |
| Student Team Members | Thành viên trong nhóm cùng phát triển dự án startup hoặc bài tập môn học | Cần hiểu chung về mô hình kinh doanh, phạm vi MVP và định hướng phát triển |
| Mentors | Cố vấn startup hỗ trợ các nhóm sinh viên | Mất nhiều thời gian giải thích lại các framework cơ bản |
| Lecturers | Giảng viên đánh giá bài tập hoặc dự án liên quan đến startup | Nhận đầu ra có chất lượng không đồng đều giữa các nhóm |
| Startup Clubs / Incubation Programs | CLB khởi nghiệp hoặc chương trình ươm tạo trong trường đại học | Cần công cụ hỗ trợ nhiều nhóm sinh viên cùng lúc |

### Impact

| Impact ID | Impact | Description |
| --- | --- | --- |
| IMP-01 | Phát triển ý tưởng chậm | Sinh viên có thể mất nhiều tuần hoặc nhiều tháng để học framework cơ bản trước khi tạo được tài liệu sử dụng được. |
| IMP-02 | Chất lượng tài liệu startup thấp | Tài liệu có thể thiếu nội dung, thiếu logic hoặc không theo cấu trúc chuẩn. |
| IMP-03 | Mentor bị quá tải | Mentor phải lặp lại các khái niệm cơ bản như Lean Canvas, MVP, SWOT và market validation. |
| IMP-04 | Tỷ lệ bỏ cuộc sớm cao | Sinh viên có thể từ bỏ ý tưởng vì thiếu định hướng hoặc thiếu sự tự tin. |
| IMP-05 | Phạm vi MVP không rõ ràng | Sinh viên có xu hướng đưa quá nhiều tính năng vào phiên bản đầu tiên, làm MVP khó triển khai. |
| IMP-06 | Chuẩn bị pitching yếu | Sinh viên khó trình bày rõ vấn đề, giải pháp, thị trường, mô hình kinh doanh và nhu cầu gọi vốn. |

### Root Cause / Contributing Factors

| Cause ID | Root Cause / Contributing Factor | Description |
| --- | --- | --- |
| RC-01 | Khó tiếp cận mentor | Mentor chất lượng có thời gian hạn chế và không thể hỗ trợ 1-1 cho tất cả nhóm sinh viên. |
| RC-02 | Kiến thức startup bị phân mảnh | Sinh viên phải tự tìm nhiều nguồn Internet khác nhau, nhưng nội dung không cá nhân hóa theo ý tưởng cụ thể. |
| RC-03 | Thiếu framework có cấu trúc | Nhiều sinh viên chưa quen với Lean Canvas, Business Model Canvas, SWOT, MVP Planning và Pitching Structure. |
| RC-04 | Thiếu kinh nghiệm thực tế | Sinh viên có thể hiểu lý thuyết nhưng chưa biết áp dụng vào một ý tưởng startup cụ thể. |
| RC-05 | Hạn chế tài chính | Sinh viên khó chi trả cho khóa học startup chuyên sâu, tư vấn chuyên nghiệp hoặc mentor trả phí. |
| RC-06 | Không có template đầu ra chuẩn | Mỗi nhóm tạo tài liệu theo cấu trúc khác nhau, gây khó khăn cho việc review và so sánh. |
| RC-07 | Thiếu tư duy kiểm chứng | Sinh viên có thể bắt đầu xây sản phẩm ngay mà chưa kiểm chứng vấn đề khách hàng và giả định thị trường. |

---

## 3. Stakeholder Register

### Stakeholders

| Role | Responsibility | Decision Authority | Needs/Concerns | Involvement |
| --- | --- | --- | --- | --- |
| Student Founder | Sử dụng hệ thống để nhập ý tưởng, tạo tài liệu, chỉnh sửa kế hoạch và chuẩn bị pitching | Thấp | Cần hướng dẫn nhanh, giá rẻ, dễ hiểu và có cấu trúc | Người dùng chính, sử dụng thường xuyên |
| Student Team Member | Cộng tác trên tài liệu startup, review output và đóng góp vào kế hoạch MVP | Thấp | Cần định hướng dự án rõ ràng, phân công dễ hiểu và tài liệu thống nhất | Sử dụng trong quá trình làm việc nhóm |
| Mentor / Startup Advisor | Review output do AI tạo, đưa phản hồi chuyên môn và cải thiện chất lượng hướng dẫn | Trung bình | Cần output đáng tin cậy, tránh AI định hướng sai cho sinh viên | Review định kỳ, hỗ trợ xây dựng rubric/template |
| Lecturer | Đánh giá bài tập, đồ án hoặc môn học liên quan startup | Trung bình | Cần đầu ra chuẩn hóa, dễ kiểm tra và dễ chấm điểm | Dùng output cho đánh giá học thuật |
| Startup Club / Incubation Program Organizer | Triển khai nền tảng cho các nhóm sinh viên và hỗ trợ hoạt động đào tạo startup | Trung bình | Cần công cụ hỗ trợ nhiều nhóm cùng lúc | Sử dụng trong workshop, bootcamp, cuộc thi startup |
| University Partner | Phê duyệt việc sử dụng trong trường hoặc chương trình học thuật | Cao | Cần đảm bảo an toàn dữ liệu, giá trị giáo dục và phù hợp mục tiêu đào tạo | Hỗ trợ phân phối và triển khai |
| Project Team / Product Owner | Xác định roadmap, ưu tiên tính năng và đảm bảo mục tiêu sản phẩm | Cao | Cần sản phẩm có người dùng, output hữu ích và chi phí vận hành hợp lý | Sở hữu định hướng sản phẩm |
| System Admin | Quản lý tài khoản, phân quyền, template, cấu hình AI và truy cập hệ thống | Trung bình | Cần công cụ quản trị ổn định và bảo mật dữ liệu | Vận hành và cấu hình hệ thống |
| AI Service Provider | Cung cấp năng lực LLM/API cho việc sinh nội dung, phân tích và hội thoại | Thấp | Cần tích hợp API ổn định, kiểm soát usage và chi phí | Phụ thuộc kỹ thuật bên ngoài |
| Investor / Sponsor | Cung cấp tài trợ hoặc hỗ trợ phát triển/sản phẩm hóa hệ thống | Trung bình | Cần bằng chứng về giá trị người dùng, mức độ sử dụng và khả năng mở rộng | Review hiệu quả và tiềm năng kinh doanh |

---

## 4. Scope and Capabilities

### Scope

#### In Scope

Hệ thống trong phiên bản chính đầu tiên bao gồm:

- AI chatbot để thu thập và làm rõ ý tưởng startup của sinh viên.
- Tóm tắt ý tưởng startup.
- Tạo Lean Canvas.
- Tạo Business Model Canvas.
- Tạo SWOT Analysis.
- Lập kế hoạch MVP và ưu tiên tính năng.
- Tạo Product Development Roadmap.
- Tạo Marketing Strategy cơ bản.
- Hướng dẫn gọi vốn và chuẩn bị pitching cơ bản.
- Tạo Pitch Outline.
- Quản lý tài khoản người dùng và project workspace.
- Chỉnh sửa tài liệu, lưu version history và export tài liệu.
- Admin quản lý template, prompt và cấu hình hệ thống.

#### Product Channels

- Web application cho sinh viên, mentor, giảng viên và admin.
- Responsive web interface để sử dụng trên laptop, tablet và trình duyệt điện thoại.
- Mobile app có thể được xem xét sau khi MVP được kiểm chứng.

### Capabilities

| Capability ID | Capability | Priority | Rationale | Dependency |
| --- | --- | --- | --- | --- |
| CAP-01 | AI Chatbot for Idea Clarification | High | Tính năng cốt lõi để thu thập ý tưởng ban đầu và đặt câu hỏi gợi mở nhằm làm rõ problem, users, solution và value proposition | LLM API, prompt templates, conversation UI |
| CAP-02 | Startup Idea Summary Generator | High | Giúp sinh viên chuyển ý tưởng thô thành bản tóm tắt rõ ràng để phân tích tiếp | CAP-01 input, idea template |
| CAP-03 | Lean Canvas Generator | High | Lean Canvas là tài liệu cốt lõi để kiểm chứng startup giai đoạn đầu | CAP-01, CAP-02, Lean Canvas template |
| CAP-04 | Business Model Canvas Generator | High | Giúp sinh viên xác định key partners, activities, resources, customer segments, channels, cost structure và revenue streams | CAP-01, CAP-02, BMC template |
| CAP-05 | SWOT Analysis Generator | High | Giúp sinh viên phân tích điểm mạnh, điểm yếu, cơ hội và thách thức của ý tưởng startup | CAP-02, SWOT prompt template |
| CAP-06 | MVP Planning Assistant | High | Giúp sinh viên xác định tính năng MVP cốt lõi và tránh phát triển quá phạm vi | CAP-02, feature prioritization rules |
| CAP-07 | Product Development Roadmap Generator | Medium | Giúp sinh viên lập kế hoạch phát triển theo giai đoạn từ validation đến MVP launch và improvement | CAP-06, roadmap template |
| CAP-08 | Marketing Strategy Generator | Medium | Giúp sinh viên xác định thị trường mục tiêu, định vị, kênh truyền thông và thông điệp ra mắt | CAP-02, marketing strategy template |
| CAP-09 | Basic Fundraising Guidance | Medium | Giúp sinh viên chuẩn bị mục đích gọi vốn, nội dung pitch và các câu hỏi thường gặp từ nhà đầu tư | CAP-02, pitch/fundraising template |
| CAP-10 | Pitch Outline Generator | Medium | Giúp sinh viên chuẩn bị cấu trúc bài pitching cho môn học, cuộc thi hoặc mentor review | CAP-02, pitch outline template |
| CAP-11 | Document Editor | High | Sinh viên cần chỉnh sửa nội dung do AI tạo trước khi sử dụng hoặc nộp bài | Rich text editor, project storage |
| CAP-12 | Document Export | Medium | Sinh viên cần xuất PDF/DOCX để nộp bài, tham gia cuộc thi hoặc gửi mentor | Document generation service |
| CAP-13 | Version History | Medium | Cho phép sinh viên so sánh và khôi phục phiên bản tài liệu trước đó | Database storage, version control logic |
| CAP-14 | Project Workspace Management | High | Mỗi ý tưởng startup cần được quản lý như một project workspace riêng | User authentication, project database |
| CAP-15 | Mentor Review Mode | Low | Cho phép mentor review và comment trên output của sinh viên | Sharing permissions, comment module |
| CAP-16 | Admin Template Management | Medium | Admin có thể cập nhật prompt, format output và template tài liệu mà không cần sửa code | Admin dashboard, template database |
| CAP-17 | Feedback and Rating | Medium | Người dùng có thể đánh giá chất lượng output để cải thiện prompt và hệ thống | Feedback module, analytics |
| CAP-18 | AI Usage Limit and Quota Management | Medium | Kiểm soát chi phí LLM và tránh lạm dụng tài khoản miễn phí | User account, rate limit service |
| CAP-19 | Disclaimer and Safety Guidance | High | Đảm bảo người dùng hiểu rằng output AI chỉ mang tính tham khảo và cần kiểm chứng | UI notification, policy text |
| CAP-20 | Rubric-based Output Evaluation | Low | Hỗ trợ kiểm tra chất lượng tài liệu startup do AI tạo | Mentor rubric, evaluation checklist |

### Out of Scope

| Out-of-Scope ID | Out-of-Scope Item | Reason |
| --- | --- | --- |
| OOS-01 | Kết nối trực tiếp với nhà đầu tư | MVP chỉ cung cấp hướng dẫn gọi vốn và chuẩn bị pitch, không kết nối investor. |
| OOS-02 | Tư vấn pháp lý, thuế hoặc tài chính chuyên nghiệp | AI chỉ cung cấp thông tin chung và không thay thế chuyên gia có chứng chỉ. |
| OOS-03 | Tự động sinh code hoàn chỉnh cho MVP | Hệ thống hỗ trợ lập kế hoạch MVP, không tự động xây dựng/coding sản phẩm. |
| OOS-04 | Cam kết startup thành công | Hệ thống hỗ trợ lập kế hoạch và học tập, không đảm bảo kết quả kinh doanh. |
| OOS-05 | Tự động xác thực dữ liệu thị trường | Sinh viên phải tự kiểm chứng market size, customer needs và competitor data. |
| OOS-06 | Bộ công cụ quản lý dự án nâng cao | Có thể hỗ trợ chia sẻ project cơ bản, nhưng full project management chưa nằm trong MVP. |
| OOS-07 | Native mobile applications | Phiên bản đầu tập trung vào responsive web application. |
| OOS-08 | Mentor marketplace hoàn chỉnh | Mentor review có thể phát triển sau, nhưng matching mentor trả phí không thuộc MVP. |
| OOS-09 | Quy trình đăng ký doanh nghiệp | Hệ thống không xử lý pháp nhân, giấy phép hoặc thủ tục thành lập công ty. |
| OOS-10 | Payment/subscription module | Chưa bao gồm trừ khi cần thương mại hóa sau khi MVP được kiểm chứng. |

---

## 5. Business Rules

### Business Rules

| Rule ID | Condition | Trigger | Outcome | Scope | Exception |
| --- | --- | --- | --- | --- | --- |
| BR-01 | User nhập ý tưởng ban đầu dưới 20 từ hoặc quá chung chung | User gửi ý tưởng startup | AI không tạo tài liệu đầy đủ ngay, mà đặt câu hỏi làm rõ | AI Chatbot | Admin có thể cấu hình ngưỡng input tối thiểu |
| BR-02 | Thiếu thông tin bắt buộc như problem, target users hoặc proposed solution | User yêu cầu tạo tài liệu | Hệ thống yêu cầu user bổ sung thông tin trước khi generate | Document generation | User có thể chọn tạo draft với cảnh báo |
| BR-03 | User yêu cầu tạo Lean Canvas | User bấm Generate Lean Canvas | Hệ thống tạo Lean Canvas theo template đã phê duyệt | Lean Canvas | Không có |
| BR-04 | User yêu cầu tạo Business Model Canvas | User bấm Generate BMC | Hệ thống tạo BMC theo template đã phê duyệt | BMC | Không có |
| BR-05 | User yêu cầu tạo SWOT Analysis | User bấm Generate SWOT | Hệ thống tạo SWOT gồm Strengths, Weaknesses, Opportunities và Threats | SWOT | Không có |
| BR-06 | User yêu cầu MVP Plan | User bấm Generate MVP Plan | Hệ thống tạo core MVP features, excluded features, assumptions và development phases | MVP planning | Không có |
| BR-07 | User yêu cầu marketing strategy | User bấm Generate Marketing Strategy | Hệ thống tạo target segment, positioning, channels, message và launch activity suggestions | Marketing module | Không có |
| BR-08 | User yêu cầu fundraising advice | User hỏi về gọi vốn hoặc chuẩn bị investor | Hệ thống cung cấp hướng dẫn gọi vốn cơ bản kèm disclaimer | Fundraising guidance | Không được cung cấp lời khuyên tài chính/pháp lý chuyên nghiệp |
| BR-09 | User yêu cầu AI viết full production code cho MVP | User nhập yêu cầu code | AI giải thích giới hạn scope và gợi ý planning, no-code/low-code hoặc high-level technical guidance | AI Chatbot | Nếu coding module được phê duyệt trong future scope |
| BR-10 | User hỏi về pháp lý, thuế hoặc đăng ký doanh nghiệp | User nhập câu hỏi legal/tax | AI cung cấp disclaimer và khuyến nghị gặp chuyên gia phù hợp | AI Chatbot | Không có |
| BR-11 | User muốn lưu project hoặc lịch sử tài liệu | User bấm Save | User phải đăng nhập trước khi lưu dữ liệu project | Project workspace | Guest user có thể copy output thủ công |
| BR-12 | User muốn export tài liệu | User bấm Export PDF/DOCX | Hệ thống export phiên bản tài liệu mới nhất được chọn | Export module | Export có thể bị giới hạn theo account plan |
| BR-13 | AI tạo bất kỳ tài liệu startup nào | Generation hoàn tất | Hệ thống hiển thị disclaimer rằng output AI chỉ để tham khảo và cần validation | All AI outputs | Không có |
| BR-14 | User chỉnh sửa nội dung do AI tạo | User sửa tài liệu | Hệ thống lưu phiên bản đã chỉnh sửa và ghi nhận updated timestamp | Document editor | Nếu là guest user, nội dung có thể không được lưu lâu dài |
| BR-15 | Có nhiều version cho cùng một tài liệu | User mở version history | Hệ thống hiển thị các version cũ với created date, updated date và author | Version history | Không có |
| BR-16 | Mentor truy cập project của sinh viên | Mentor mở shared project link | Hệ thống chỉ cho truy cập nếu sinh viên đã cấp quyền | Mentor review | Admin có thể truy cập để hỗ trợ/audit nếu chính sách cho phép |
| BR-17 | User cố truy cập project riêng tư của user khác | Có hành vi truy cập trái phép | Hệ thống từ chối truy cập và ghi log sự kiện | Access control | Project được share hợp lệ thì được phép |
| BR-18 | Admin cập nhật document template hoặc prompt | Admin lưu cấu hình | Các lần generate mới dùng template mới; tài liệu cũ giữ nguyên | Admin template management | Admin có thể regenerate tài liệu được chọn |
| BR-19 | User vượt quá quota AI | User gửi message hoặc yêu cầu generate | Hệ thống chặn request hoặc yêu cầu chờ/nâng cấp tùy chính sách sản phẩm | AI usage management | Admin có thể cấp thêm quota |
| BR-20 | User report output AI kém chất lượng | User bấm Report/Feedback | Hệ thống ghi nhận feedback để review và cải thiện chất lượng | Feedback module | Không có |

---

## 6. Constraints and Assumptions

### Constraints

| Constraint ID | Constraint | Impact | Owner/Source | Validation |
| --- | --- | --- | --- | --- |
| CON-01 | Chi phí sử dụng LLM/API có thể cao | Tài khoản miễn phí có thể cần giới hạn số message hoặc số lần generate | Project Team | Theo dõi chi phí API trong pilot |
| CON-02 | Chất lượng output AI phụ thuộc vào chất lượng input | Input mơ hồ có thể tạo tài liệu chung chung hoặc thiếu chính xác | Product Owner / UX Team | Test với nhiều mẫu ý tưởng sinh viên |
| CON-03 | AI có thể hallucinate hoặc tạo dữ liệu thị trường chưa kiểm chứng | User có thể nhận thông tin gây hiểu nhầm nếu không được cảnh báo | AI/Content Team | Đánh giá bằng bộ test case tài liệu startup |
| CON-04 | Yêu cầu chất lượng tiếng Việt tốt | Output tiếng Việt kém sẽ làm giảm khả năng sử dụng của sinh viên Việt Nam | AI/Content Team | Test prompt và output startup bằng tiếng Việt |
| CON-05 | Hệ thống phụ thuộc vào AI service bên ngoài | API downtime hoặc quota issue có thể ảnh hưởng đến tính năng chính | Technical Team | Monitor API uptime và phương án fallback |
| CON-06 | Ý tưởng startup của sinh viên là dữ liệu nhạy cảm | Rò rỉ dữ liệu có thể làm giảm niềm tin và adoption | Security/Admin Team | Security review và access control testing |
| CON-07 | MVP scope cần được kiểm soát | Quá nhiều tính năng sẽ làm chậm tiến độ và tăng chi phí | Product Owner | Ưu tiên Must-have capabilities trước |
| CON-08 | User có thể không hiểu thuật ngữ startup | Ngôn ngữ phức tạp làm giảm hiệu quả học tập | UX/Content Team | Usability testing với sinh viên |
| CON-09 | Export format cần đáp ứng nhu cầu nộp bài | Format kém làm giảm giá trị sử dụng cho bài tập/cuộc thi | Product/Engineering Team | Validate file PDF/DOCX mẫu |
| CON-10 | Legal/financial advice phải được giới hạn | Lời khuyên chuyên môn không phù hợp có thể tạo rủi ro trách nhiệm | Project Team / Legal Advisor | Review disclaimer và response boundaries |
| CON-11 | Cần kết nối Internet để dùng AI | User không thể generate nội dung AI khi offline | Technical Team | Xác nhận giả định triển khai và availability |
| CON-12 | Lưu trữ dữ liệu phải tuân theo nguyên tắc bảo mật | Quản trị dữ liệu kém có thể tạo rủi ro bảo mật và tuân thủ | Security/Admin Team | Review authentication, authorization và data retention policy |

### Assumptions

| Assumption ID | Assumption | Impact | Owner/Source | Validation |
| --- | --- | --- | --- | --- |
| ASM-01 | Sinh viên đã có ít nhất một ý tưởng startup cơ bản | Hệ thống có thể bắt đầu từ input của user thay vì tự tạo ý tưởng ngẫu nhiên | Product Owner | Test onboarding với sinh viên |
| ASM-02 | Sinh viên cần tài liệu có cấu trúc cho môn học, cuộc thi hoặc pitching | Template cần phù hợp với nhu cầu học thuật và startup program | Lecturer / Startup Program Organizer | Validate template với giảng viên và mentor |
| ASM-03 | Sinh viên có thể sử dụng web application | Responsive web app đủ cho phiên bản đầu | UX Team | User testing trên laptop và mobile browser |
| ASM-04 | Mentor vẫn chịu trách nhiệm review chuyên môn cuối cùng | AI hỗ trợ chuẩn bị, không thay thế đánh giá chuyên gia | Mentor / Product Owner | Xác nhận review workflow trong pilot |
| ASM-05 | Kiến thức LLM hữu ích cho hướng dẫn startup tổng quát | AI có thể tạo bản nháp tốt nếu được hướng dẫn bằng template | AI/Content Team | Đánh giá bằng rubric và feedback mentor |
| ASM-06 | Sinh viên ưu tiên công cụ miễn phí hoặc chi phí thấp | Pricing và quota phải phù hợp khả năng chi trả của sinh viên | Business Owner | Khảo sát target users |
| ASM-07 | Trường đại học và CLB startup có thể hỗ trợ adoption | Partnership có thể giúp thu hút early users | Business Development Team | Validate qua pilot partnerships |
| ASM-08 | Prompt template có thể chuẩn hóa chất lượng tài liệu | Template tốt giúp giảm output không đồng đều | AI/Content Team | A/B test prompt templates |
| ASM-09 | User sẵn sàng feedback về chất lượng AI | Feedback giúp cải thiện prompt và output theo thời gian | Product Team | Đo tỷ lệ feedback submission |
| ASM-10 | Tài liệu sinh ra cần được con người chỉnh sửa trước khi dùng cuối cùng | Document editor là tính năng cần có để user tinh chỉnh output | Product Owner | Test với bài tập sinh viên thật |

---

## 7. Risks and Issues

### Risks

| Risk ID | Risk | Likelihood | Impact | Mitigation | Status |
| --- | --- | --- | --- | --- | --- |
| RSK-01 | AI hallucination tạo số liệu thị trường giả hoặc lời khuyên sai | Medium | High | Thêm system prompt nghiêm ngặt, disclaimer, nhắc user kiểm chứng nguồn và nút report | In design |
| RSK-02 | Sinh viên ỷ lại quá nhiều vào AI và giảm tư duy phản biện | High | Medium | Dùng phong cách Socratic, yêu cầu user xác nhận giả định trước khi tạo output cuối | In design |
| RSK-03 | Chi phí API tăng cao khi lượng user tăng | Medium | High | Áp dụng rate limit, quota, caching, tối ưu prompt và monitoring usage | Pending implementation |
| RSK-04 | Output quá chung chung và ít giá trị | Medium | Medium | Đặt câu hỏi làm rõ, yêu cầu input quan trọng và dùng template có cấu trúc | In design |
| RSK-05 | Dữ liệu ý tưởng startup bị lộ hoặc truy cập trái phép | Low | High | Triển khai authentication, role-based access, encryption và sharing permission | Pending security design |
| RSK-06 | Mentor không tin tưởng tài liệu do AI tạo | Medium | Medium | Xây mentor review mode, rubric đánh giá output và giải thích giới hạn AI | Needs validation |
| RSK-07 | Sinh viên không hiểu thuật ngữ startup | Medium | Medium | Thêm giải thích đơn giản, ví dụ minh họa và glossary/tooltips | Pending UX design |
| RSK-08 | Hệ thống lỗi khi AI provider API không hoạt động | Medium | High | Thêm graceful error handling, retry logic, fallback message và provider monitoring | Pending technical design |
| RSK-09 | Nội dung legal/fundraising tạo rủi ro trách nhiệm | Medium | High | Giữ hướng dẫn ở mức tổng quát, thêm disclaimer và chặn claim chuyên môn | In design |
| RSK-10 | Format export kém ảnh hưởng đến chất lượng nộp bài | Medium | Medium | Validate export template và test với format bài nộp thực tế | Pending QA |

### Issues

| Issue ID | Issue | Likelihood | Impact | Mitigation | Status |
| --- | --- | --- | --- | --- | --- |
| ISS-01 | Chưa có rubric chính thức để đánh giá Lean Canvas, BMC, SWOT và MVP Plan do AI tạo | High | High | Làm việc với mentor và giảng viên để tạo rubric trước khi launch | Needs immediate action |
| ISS-02 | Chưa chọn AI service provider cuối cùng | Medium | High | So sánh provider theo chất lượng tiếng Việt, chi phí, latency, API stability và safety | Pending decision |
| ISS-03 | Chưa phê duyệt cấu trúc template cuối cùng cho từng tài liệu startup | High | High | Định nghĩa và phê duyệt template cho Lean Canvas, BMC, SWOT, MVP Plan, Marketing Plan và Pitch Outline | In progress |
| ISS-04 | Chưa chốt quyền của student, mentor, lecturer và admin | Medium | Medium | Định nghĩa RBAC model trong PRD và SAD | Pending analysis |
| ISS-05 | Chưa có pilot dataset từ ý tưởng startup thật của sinh viên | High | Medium | Thu thập sample ideas từ sinh viên và CLB startup để testing | Pending research |
| ISS-06 | Chưa có chính sách rõ ràng về lưu trữ và xóa ý tưởng startup của user | Medium | High | Định nghĩa privacy policy, data retention rules và deletion workflow | Pending security/legal review |
| ISS-07 | Chưa validate onboarding flow cho sinh viên chưa biết bắt đầu từ đâu | Medium | Medium | Thiết kế guided onboarding với ví dụ và starter questions | Pending UX testing |
| ISS-08 | Chưa chốt monetization hoặc quota model | Medium | Medium | Test free quota, student plan, institutional plan và sponsorship options | Pending business decision |

---

## 8. Research Basis

BRD này được xây dựng dựa trên các hướng nghiên cứu và hoạt động validation sau:

| Research ID | Research Activity | Purpose | Expected Output |
| --- | --- | --- | --- |
| RES-01 | Phỏng vấn 50 sinh viên đại học quan tâm đến khởi nghiệp | Xác định pain points khi sinh viên bắt đầu dự án startup | Danh sách vấn đề phổ biến, kỳ vọng và nhu cầu hỗ trợ |
| RES-02 | Khảo sát các nhóm sinh viên tham gia môn học/cuộc thi startup | Hiểu loại tài liệu nào sinh viên gặp khó khăn nhất khi tạo | Xếp hạng nhu cầu với Lean Canvas, SWOT, MVP Plan, Pitch Outline |
| RES-03 | Phỏng vấn startup mentors và lecturers | Validate tiêu chí chất lượng cho tài liệu do AI tạo | Rubric đánh giá Lean Canvas, BMC, SWOT, MVP Plan và Pitch Outline |
| RES-04 | Phân tích các công cụ AI education và business consulting hiện có | Tìm khoảng trống thị trường và cơ hội khác biệt hóa | USP và feature positioning cho AI Startup Coach |
| RES-05 | Review các startup frameworks chuẩn | Đảm bảo output sinh ra tuân theo cấu trúc startup planning phổ biến | Template được phê duyệt cho Lean Canvas, BMC, SWOT, MVP Plan, Marketing Plan |
| RES-06 | Pilot test với 20-30 sinh viên | Validate usability, chất lượng output và mức độ hài lòng | Pilot report và improvement backlog |
| RES-07 | Chạy test case đánh giá chất lượng AI output | Đo hallucination rate, relevance, completeness và clarity | AI quality benchmark và prompt improvement plan |
| RES-08 | Test prompt startup bằng tiếng Việt | Đảm bảo hệ thống hỗ trợ tốt sinh viên Việt Nam | Đánh giá chất lượng ngôn ngữ tiếng Việt |
| RES-09 | Validate format export với giảng viên | Đảm bảo output có thể dùng để nộp bài hoặc tham gia cuộc thi | Template PDF/DOCX được phê duyệt |
| RES-10 | Phân tích chi phí API trong pilot | Ước lượng chi phí vận hành và tính khả thi của free quota | Cost model và rate limit policy |

---

## Appendix A. Feature ID Summary

| Feature ID | Feature Name | Related Capability |
| --- | --- | --- |
| F-01 | Idea Clarification Chat | CAP-01 |
| F-02 | Startup Idea Summary | CAP-02 |
| F-03 | Lean Canvas Generation | CAP-03 |
| F-04 | Business Model Canvas Generation | CAP-04 |
| F-05 | SWOT Analysis Generation | CAP-05 |
| F-06 | MVP Plan Generation | CAP-06 |
| F-07 | Product Roadmap Generation | CAP-07 |
| F-08 | Marketing Strategy Generation | CAP-08 |
| F-09 | Fundraising Guide Generation | CAP-09 |
| F-10 | Pitch Outline Generation | CAP-10 |
| F-11 | Document Editor | CAP-11 |
| F-12 | Document Export | CAP-12 |
| F-13 | Version History | CAP-13 |
| F-14 | Project Workspace Management | CAP-14 |
| F-15 | Mentor Review Mode | CAP-15 |
| F-16 | Admin Template Management | CAP-16 |
| F-17 | Feedback and Rating | CAP-17 |
| F-18 | AI Usage Limit and Quota Management | CAP-18 |
| F-19 | Disclaimer and Safety Guidance | CAP-19 |
| F-20 | Rubric-based Output Evaluation | CAP-20 |
