# Code Review Report: Prompt Harness Migration

**Feature**: AI Startup Coach — Prompt Harness Migration  
**Reviewer**: Automated SDD Review (step 5 of 6)  
**Date**: 2026-08-02  
**Build**: ✅ 0 errors, 0 warnings  
**Frontend Tests**: ✅ 5 suites, 14 tests — all passed  
**Backend Tests**: ⚠️ No backend test project exists (see Critical #1)

---

## Findings

### 🔴 Critical (blocks completion)

#### C1 — No backend unit tests for any of the changed code

Constitution Principle 1 (TDD Mandatory) and TS-3 require xUnit + Moq unit tests for service-layer logic. No test project exists under `src/`. The new `GetSystemPromptAsync(stage)`, Safety Review logic, stage transition logic, and DataSeeder changes are **completely untested**.

> This is a pre-existing gap (no test project existed before this change either), but the constitution explicitly blocks merge without tests. At minimum, the new logic introduced in this change needs coverage.

**Action**: Create a test project and add unit tests for the new stage-aware prompt logic, or document an explicit constitution exception.

---

### 🟠 Important (FIXED)

#### I1 — `GetUserSessionsAsync` does not map `Stage` to the response
**Status: ✅ FIXED** — Added `Stage = s.Stage` to the LINQ projection.

---

#### I2 — No validation on `TargetStage` input — arbitrary strings accepted
**Status: ✅ FIXED** — Added validation to reject any TargetStage not in `["clarifying", "planning", "executing"]`.

---

#### I3 — Quota deducted only once despite up to 3 LLM calls
**Status: ✅ FIXED** — Added `llmCallCount` to track actual API calls (initial + safety review + correction) and deduct appropriately.

---

#### I4 — `SendMessageResponse` does not include `Stage`
**Status: ✅ FIXED** — Added `Stage` to `SendMessageResponse` DTO and mapped it in `ChatService`.

---

### 🟡 Minor

#### M1 — Safety Review `Contains("PASS")` is fragile

[ChatService.cs L187](file:///d:/Github/AI_Startup_Coach/src/AIStartupCoach.API/Services/ChatService.cs#L187) — The check `safetyResponse.Contains("PASS")` would match if the LLM writes "this PASSED inspection" or "items that did not PASS". A more robust approach would be to check if the trimmed response starts with `"PASS"` or use a structured JSON/XML tag.

---

#### M2 — Safety Review `catch (Exception)` silently swallows all errors

[ChatService.cs L195-198](file:///d:/Github/AI_Startup_Coach/src/AIStartupCoach.API/Services/ChatService.cs#L195-L198) — If the safety review LLM call fails (network error, rate limit, invalid API key), the error is completely swallowed and the potentially unsafe content is served to the user. At minimum, log the exception so operators can detect systematic safety review failures.

---

#### M3 — Stage magic strings repeated across files

The strings `"clarifying"`, `"planning"`, `"executing"` appear as hardcoded literals in `ChatSession.cs` (default), `ChatService.cs` (switch + stage assignment), and `DataSeeder.cs` (not yet, but will be needed). Constitution Principle 10 says "No hardcode — mọi giá trị cấu hình phải đặt trong constants". Consider a `ChatStages` static class with string constants.

---

### 💬 Nit

#### N1 — `IdeaSummary` re-extracted after Safety Review regeneration

[ChatService.cs L163-170](file:///d:/Github/AI_Startup_Coach/src/AIStartupCoach.API/Services/ChatService.cs#L163-L170) — `IdeaSummary` is extracted from the *first* `aiResponseText` and saved. If Safety Review triggers a regeneration (L191), the regenerated response may have a different `<idea_summary>` that goes unprocessed. This is a minor inconsistency.

---

## Constitution Compliance Check (final code)

| Principle | Status | Notes |
|---|---|---|
| 1. TDD Mandatory | 🔴 **Violated** | No backend tests exist for any of the new logic (C1). |
| 2. Layered Architecture | ✅ Complies | Controller → Service → Repository flow maintained. |
| 3. Template-Driven AI Output | ✅ Complies | Harness templates now enforce structured phases. |
| 4. Authentication Required | ✅ Complies | All endpoints still behind JWT. |
| 5. BYOK API Key Security | ✅ Complies | No changes to key handling. |
| 6. AI Disclaimer | ✅ Complies | Disclaimer enforcement is in the templates. |
| 7. Vietnamese-First | ✅ Complies | All prompts and messages in Vietnamese. |
| 8. FBA Frontend | ✅ N/A | No frontend structure changes in this PR. |
| 9. Professional UI | ✅ N/A | No UI changes in this PR. |
| 10. No Hardcode | 🟠 **Partial** | Stage strings are hardcoded literals (M3). |

---

## Verdict

**🔴 NOT CLEAN — Critical issue C1 blocks completion.**

The feature logic is sound and the architectural approach (Constitution + Phase composition, Safety Review for high-risk doc types) follows the README spec well. However:

1. **C1** (no backend tests) is a hard constitution violation that blocks merge per Quality Gate rules.
2. **I1** (missing Stage mapping in GetUserSessions) is a functional bug — frontend will receive empty Stage for all sessions.
3. **I2-I4** are robustness/completeness issues that should be addressed.

### Recommended next steps
1. Fix **I1** immediately (1-line fix).
2. Add **I2** validation (small guard clause).
3. Add **I4** Stage to SendMessageResponse.
4. Decide on **C1**: Create backend test project with tests for the new logic, OR document an explicit constitution exception if deferring tests.
5. Address **M1-M3** as time permits.
