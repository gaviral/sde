# 📝 ShareSix Mock Interview Script

**Role:** Founding Front-End Engineer / Technical Lead  
**Duration:** 90 min (coding + behavioural)  
**Interviewer:** ********\_********

---

## 0. Pre-Interview Checklist

| Item                                                                      | Done? |
| ------------------------------------------------------------------------- | ----- |
| Candidate has a clean React sandbox (Vite or CRA) ready to share.         |
| Video + screen-share working.                                             |
| You have this script and a stopwatch.                                     |
| Friendly reminder: AI assistants allowed but candidate must justify code. |

---

## 1. Agenda (keep the clock)

| Segment                                | Minutes | What you do                                                                                                       |
| -------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| Intro / warm-up                        | 5       | Explain format; confirm they can record screen; “Feel free to ask clarifying questions at any time.”              |
| **Requirement hand-off & design talk** | 15      | Read the _Business Scenario_ below. Pause—let them ask questions, sketch approach, choose TDD vs rapid prototype. |
| **Live-coding**                        | 45      | Observe, nudge only if blocked.                                                                                   |
| Demo & refactor                        | 10      | Ask them to walk through UX, code structure, and performance/accessibility trade-offs.                            |
| Behavioural / negotiation Qs           | 10      | Use _Section 5_ prompts.                                                                                          |
| Wrap-up & candidate questions          | 5       | Offer feedback if time.                                                                                           |

> **Tip:** Soft-cut segments if drift—but keep total ≤ 90 min.

---

## 2. Business Scenario (read aloud)

> “ShareSix (sharesix.com) is building a platform that lets **front-line retail staff (‘associates’) send personalized product recommendations to customers via a shareable link**, driving a new 1-to-1 customer-experience channel.” citeturn1view0
>
> “You’re shipping an internal React tool called **‘RecBuilder’**—it lives inside our web app used by associates on tablets.”

### MVP requirement

1. Display a **product search box** (free-text fetches `/api/products?q=`).
2. Let the associate **select up to 3 items** → show small “selection chips”.
3. Provide a **note textbox (max 280 chars)** for a personal message.
4. **Generate** a short, shareable URL by POSTing `{items:[…], note:"…"}` to `/api/recs` → response `{shareUrl:"https://six.app/r/abc123"}`.
5. Show a **Preview Card** with product thumbnails, note, and **“Copy Link”** button with clipboard feedback.

### Stretch (offer only if they finish early)

- Inline form validation + a11y (ARIA, focus traps).
- Dark-mode & mobile-first tweaks.
- Optimistic UI update of a “Recent Recommendations” list.

---

## 3. Clarifying-question cues

If they _don’t_ ask, prompt gently:

- “What error states do you anticipate from the APIs?”
- “How would you handle 3000-product search latency?”
- “How will you ensure the preview meets WCAG AA?”

Seeing these shows requirement-gathering skill.

---

## 4. Evaluation Rubric (fill during/after)

| Dimension                     | 1             | 3                      | 5                                         |
| ----------------------------- | ------------- | ---------------------- | ----------------------------------------- |
| **Requirement clarification** | Misses basics | Asks some, leaves gaps | Systematic, business-oriented             |
| **Code quality / structure**  | Spaghetti     | Reasonable separation  | Clean comp layering, hooks, TS types      |
| **Performance & a11y**        | Ignores       | Mentions               | Implements & validates                    |
| **Testing approach**          | None          | Talks but no code      | Adds meaningful unit/RTL tests or Cypress |
| **Use of AI**                 | Blind copy    | Light edits            | Prompts explain, iterates, refactors      |
| **Communication**             | Minimal       | OK                     | Clear, leadership-level                   |

---

## 5. Behavioural & Strategic Prompts

Ask 2-3, pick based on time:

1. **Technical ownership** – “Tell me about a time you owned a product end-to-end. How did you balance speed vs quality?”
2. **Architecture vision** – “If you joined ShareSix tomorrow, what _first month_ architecture wins would you target?”
3. **Scaling & hiring** – “How would you decide which roles to hire first?”
4. **Negotiation readiness** – “What does a compelling offer look like for you?”
5. **Fallback under constraint** – “Imagine we banned AI tools halfway through—how do you adapt?”

Score on depth, clarity, and alignment with founding-engineer responsibilities.

---

## 6. Debrief Template (for your notes)

- **Overall hire-/no-hire signal:**
- **Strengths observed:**
- **Concerns / areas to probe next round:**
- **Suggested comp band:**

---

## 7. Logistics Reminders

- Keep candidate screen-sharing entire time.
- Friendly but realistic pressure—allow _one_ rescue hint max.
- Hard-stop at 90 min (Mike does).

---

**Good luck!**  
This script should let your friend simulate ShareSix’s real interview flow while giving you practice on the exact business scenario they’re solving.
