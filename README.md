# Bayesian Campus Service Center Analysis (PyMC)

**Course:** MT-2002 Statistical Modeling  
**Assignment:** A#01 — Bayesian Statistical Modeling with PyMC  
**Student ID:** i222327  
**Semester:** Fall 2026  
**Instructor:** Dr. Muhammad Rizwan  
**Repository:** [`Bayesian_PyMC`](https://github.com/rohaan2802/Bayesian_PyMC)  
**Source notebook:** `notebook/i222327_A01_A_SM.ipynb`

---

# Live Link

> Official project entry points. These are the links to open, share, and submit.

## Live Website
**https://rohaan2802.github.io/Bayesian_PyMC/**

## Operations Decision Dashboard
**https://rohaan2802.github.io/Bayesian_PyMC/dashboard.html**

## Full Executed Notebook Report
**https://rohaan2802.github.io/Bayesian_PyMC/notebook-report.html**

## GitHub Repository
**https://github.com/rohaan2802/Bayesian_PyMC**

## Source Notebook (.ipynb)
**https://github.com/rohaan2802/Bayesian_PyMC/blob/main/notebook/i222327_A01_A_SM.ipynb**

---

## 1. What this assignment was about

This assignment is a **case-based Bayesian modeling project**, not a plug-and-play formula sheet.

A university **campus service center** collects:

1. daily request counts, and  
2. resolution times for selected requests.

Management wants answers that are useful for operations:

- How many requests should we expect on a typical working day?
- How long does a request typically take?
- Is a 14-minute resolution target practically achieved?
- Are quiet (zero-request) days just Poisson chance, or a separate process?
- Does one extreme 42-minute case change the “typical time” story?

We answered these questions using **PyMC** (model building + MCMC) and **ArviZ** (summaries, diagnostics, comparison).

---

## 2. Learning outcomes (what we practiced)

By finishing the notebook we demonstrated that we can:

1. distinguish **discrete** vs **continuous** variables  
2. choose likelihoods that match the data-generating process  
3. specify and justify Bayesian **priors**  
4. fit **Poisson**, **Zero-Inflated Poisson**, **Gaussian**, and **Student-t** models  
5. summarize uncertainty with posterior means and **94% HDIs**  
6. use **posterior predictive checks**  
7. compare models formally and visually  
8. explain the effect of an **outlier**  
9. apply **ROPE** for practical equivalence  
10. communicate an integrated operational conclusion  
11. *(extensions)* run diagnostics, LOO, sensitivity, utility, calibration, and forward checks  

---

## 3. Dataset details

| Variable | Type | n | Meaning |
|---|---|---:|---|
| `requests_per_day` | Discrete count | 40 | Requests received each working day |
| `resolution_time` | Continuous (minutes) | 35 | Time to resolve selected requests |

### Exploratory facts we used everywhere later
- mean demand ≈ **2.95**/day  
- variance ≈ **4.82** (over-dispersion vs pure Poisson intuition)  
- **8/40 = 20%** days have zero requests  
- resolution times mostly near low-to-mid teens  
- one extreme value: **42.0 minutes**

These facts drove model choice: ZIP for zeros, Student-t for robust typical time.

---

## 4. Step-by-step: required assignment cases

### Case 1 — Understanding the data
**Required:** classify variables, compute diagnostics, plot histograms.  
**What we did:**
- labeled `requests_per_day` as discrete count (Poisson/ZIP candidates)
- labeled `resolution_time` as continuous measurement (Gaussian/Student-t candidates)
- reported mean/variance/min/max/zero-day rate for counts
- reported mean/sd/min/max/median for times and identified 42 minutes as unusual
- produced labeled histograms for both series

**Why it matters:** every later model is justified from this EDA, not guessed.

### Case 2 — Poisson demand model
**Model:**  
\(y_i \sim \mathrm{Poisson}(\lambda),\quad \lambda \sim \mathrm{Gamma}(3,1)\)

**What we did:**
- justified Gamma(3,1) as weakly informative for a small campus center
- generated prior predictive counts (≥ 5000 draws)
- sampled posterior with 2 chains / 1000 tune / 1000 draws
- reported λ posterior mean **2.955**, 94% HDI **[2.462, 3.490]**

**Interpretation:** typical demand is only a few requests/day, with quantified uncertainty.

### Case 3 — Zero-Inflated Poisson
**Why:** 20% zero days may be too many for ordinary Poisson.

**What we did:**
- fit ZIP with Beta prior on ψ and Gamma on λ
- compared λ and ψ posteriors against Poisson
- ran posterior predictive checks for zero-day rate

**Key result:**
- observed zero rate **0.200**
- Poisson PPC ≈ **0.053**
- ZIP PPC ≈ **0.231**

**Interpretation:** quiet days behave like a separate process; ZIP is operationally better for planning low-demand days.

### Case 4 — Gaussian resolution-time model
**What we did:**
- placed sensible priors on μ and σ for the minute scale
- sampled posterior and inspected traces
- obtained μ ≈ **14.52**, σ ≈ **5.16**

**Interpretation:** the 42-minute case pulls the Gaussian scale upward, so “typical time” becomes blurred.

### Case 5 — Student-t robust model
**What we did:**
- used heavy-tailed Student-t likelihood with ν > 2
- estimated μ, σ, ν jointly
- obtained μ ≈ **13.71**, σ ≈ **1.36**, ν ≈ **2.97**

**Interpretation:** typical work completes near ~13.7 minutes; long cases are treated as tail events, not the new normal.

### Case 6 — Continuous comparison + PPC
**What we did:**
- compared Gaussian vs Student-t parameter tables
- compared posterior predictive distributions to observed times

**Interpretation:** Student-t is preferred for reporting typical resolution time.

### Case 7 — ROPE vs 14-minute benchmark
**ROPE rules applied to Student-t μ HDI ≈ [13.14, 14.26]:**

| ROPE | Decision |
|---|---|
| [13.0, 15.0] | Accept practical equivalence |
| [13.5, 14.5] | **Undecided** |
| [13.8, 14.2] | Undecided |

**Interpretation:** under the assignment’s primary ROPE, we cannot confidently declare the 14-minute target practically achieved.

### Case 8 + Discussion — Integrated decision
We combined:
- demand estimate and zero-day behavior
- preferred resolution-time model
- outlier policy
- ROPE uncertainty

into a management-facing conclusion and a structured discussion of priors, likelihood choice, and uncertainty communication.

---

## 5. Extension packs (what we added beyond the minimum)

### Pack A (Cases 9–15) — professional deepening
- MCMC diagnostics (R-hat / ESS)
- LOO/ELPD model comparison
- prior sensitivity for Poisson λ
- outlier influence study
- staffing risk curve + weekly demand forecast
- executive posterior dashboard
- synthesis checklist

### Pack B (Cases 16–20) — decision science
- capacity policy curve
- resolution-time SLA coverage
- computational diagnostics snapshot
- workflow optimization checklist
- viva / portfolio defense card

### Pack C (Cases 21–30) — saturation layer
- PPC report cards for all core models
- PIT calibration plots
- decision-analytic staffing utility (**optimum staff = 4**)
- weekday hierarchical demand proxy
- leave-future-out style check (30 train / 10 test)
- model comparison weights
- executive one-pager
- completeness matrix
- hard-stop table (what needs new data)

---

## 6. How we did the work (methods & workflow)

### Modeling workflow
1. EDA and variable classification  
2. Prior specification + prior predictive check  
3. MCMC sampling with shared settings  
4. Posterior summary (mean + 94% HDI)  
5. Posterior predictive check  
6. Model comparison (tables, PPC, LOO)  
7. Decision translation (ROPE, staffing, SLA, utility)

### Reproducibility controls
- `RANDOM_SEED = 2026`
- shared `SAMPLE_KWARGS`: draws=1000, tune=1000, chains=2, target_accept=0.9, log_likelihood=True
- portable PyTensor cache path
- helpers: `posterior_summary`, `rope_decision`, `quick_diag`

### Delivery stack
- Jupyter notebook source
- responsive GitHub Pages site (`index.html`)
- interactive operations dashboard (`dashboard.html`)
- themed HTML notebook report (`notebook-report.html`)
- 36 case-tagged screenshots

---

## 7. Final numerical snapshot

| Quantity | Final notebook value |
|---|---|
| Poisson λ mean / HDI | 2.955 / [2.462, 3.490] |
| ZIP ψ / λ | 0.793 / 3.570 |
| Gaussian μ / σ | 14.517 / 5.157 |
| Student-t μ / σ / ν | 13.710 / 1.359 / 2.965 |
| Utility-optimal staff | 4 |
| Preferred count model | ZIP |
| Preferred continuous model | Student-t |
| Primary ROPE decision | Undecided on [13.5, 14.5] |

---

## 8. Website features (live pages)

All three live pages support:

- **Dark / Light theme toggle** (saved in browser)
- Professional typography (**Source Serif 4** headings, **Source Sans 3** body)
- Clear hierarchy: large titles, normal body, readable tables
- Motion: scroll reveals, soft hover lifts, tab transitions, KPI count-up
- Interaction: accordion cases, model tabs, gallery filters + search
- Mobile-safe layout (no horizontal overflow)

Open them here:

- [Live website](https://rohaan2802.github.io/Bayesian_PyMC/)
- [Dashboard](https://rohaan2802.github.io/Bayesian_PyMC/dashboard.html)
- [Notebook report](https://rohaan2802.github.io/Bayesian_PyMC/notebook-report.html)

---

## 9. Notebook font size

Yes — notebook fonts can be enlarged.  
This repo now includes a notebook styling cell that increases:

- markdown body/headings  
- code editor text  
- output text/tables  

The same larger typography is applied in the exported HTML report.

---

## 10. How to run locally

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
jupyter notebook notebook/i222327_A01_A_SM.ipynb
```

Regenerate report:

```bash
python -m jupyter nbconvert --to html --output-dir . --output notebook-report notebook/i222327_A01_A_SM.ipynb
```

---

## 11. Repository structure

```text
Bayesian_PyMC/
├── README.md
├── LICENSE
├── requirements.txt
├── index.html
├── dashboard.html
├── notebook-report.html
├── notebook/i222327_A01_A_SM.ipynb
├── assets/css/theme.css
├── assets/js/site.js
└── docs/
    ├── screenshots/                 # 01–36
    ├── enhanced_results.json
    ├── decision_extension.json
    └── saturation_results.json
```

---

## 12. Screenshot gallery (headings above images)

### Required analysis

### 01 — Case 1: Daily requests histogram
![01](docs/screenshots/01-requests-histogram.png)

### 02 — Case 1: Resolution-time histogram
![02](docs/screenshots/02-resolution-histogram.png)

### 03 — Case 2: Prior predictive counts
![03](docs/screenshots/03-prior-predictive-counts.png)

### 04 — Case 2: Poisson trace
![04](docs/screenshots/04-poisson-trace.png)

### 05 — Case 2: Poisson posterior for λ
![05](docs/screenshots/05-poisson-posterior-lambda.png)

### 06 — Case 3: Count PPC comparison
![06](docs/screenshots/06-zip-ppc-compare.png)

### 07 — Case 4: Gaussian traces
![07](docs/screenshots/07-gaussian-trace.png)

### 08 — Case 4: Gaussian posteriors
![08](docs/screenshots/08-gaussian-posteriors.png)

### 09 — Case 5: Student-t posteriors
![09](docs/screenshots/09-student-t-posteriors.png)

### 10 — Case 6: Continuous PPC
![10](docs/screenshots/10-continuous-ppc-compare.png)

### 11 — Dataset overview board
![11](docs/screenshots/11-dataset-overview.png)

### 12 — Count diagnostics cards
![12](docs/screenshots/12-count-diagnostics-cards.png)

### 13 — Poisson vs ZIP table
![13](docs/screenshots/13-poisson-vs-zip-table.png)

### 14 — Zero-day PPC rates
![14](docs/screenshots/14-zero-day-ppc-rates.png)

### 15 — Gaussian vs Student-t table
![15](docs/screenshots/15-gaussian-vs-studentt-table.png)

### 16 — Outlier scale effect
![16](docs/screenshots/16-outlier-scale-effect.png)

### 17 — ROPE sensitivity table
![17](docs/screenshots/17-rope-sensitivity-table.png)

### 18 — Analysis workflow
![18](docs/screenshots/18-analysis-workflow.png)

### 19 — Key conclusions board
![19](docs/screenshots/19-key-conclusions.png)

### 20 — Stack and reproducibility
![20](docs/screenshots/20-stack-reproducibility.png)

### Extension packs

### 21 — Enhanced posterior dashboard
![21](docs/screenshots/21-enhanced-posterior-dashboard.png)

### 22 — Prior sensitivity for λ
![22](docs/screenshots/22-prior-sensitivity-lambda.png)

### 23 — Staffing risk curve
![23](docs/screenshots/23-staffing-risk-curve.png)

### 24 — Weekly demand forecast
![24](docs/screenshots/24-weekly-demand-forecast.png)

### 25 — Outlier influence on μ
![25](docs/screenshots/25-outlier-influence-mu.png)

### 26 — Capacity policy curve
![26](docs/screenshots/26-capacity-policy-curve.png)

### 27 — Resolution-time SLA coverage
![27](docs/screenshots/27-resolution-sla-coverage.png)

### 28 — Optimization checklist
![28](docs/screenshots/28-optimization-checklist.png)

### 29 — PIT calibration (count models)
![29](docs/screenshots/29-pit-count-models.png)

### 30 — PIT calibration (continuous models)
![30](docs/screenshots/30-pit-continuous-models.png)

### 31 — Staffing utility curve
![31](docs/screenshots/31-staffing-utility-curve.png)

### 32 — Weekday hierarchical rates
![32](docs/screenshots/32-weekday-hierarchical-rates.png)

### 33 — Model comparison weights
![33](docs/screenshots/33-model-comparison-weights.png)

### 34 — Executive one-pager
![34](docs/screenshots/34-executive-one-pager.png)

### 35 — Completeness matrix
![35](docs/screenshots/35-completeness-matrix.png)

### 36 — Leave-future-out split
![36](docs/screenshots/36-leave-future-out-split.png)

---

## 13. About this repository

| Field | Value |
|---|---|
| Name | `Bayesian_PyMC` |
| Description | MT-2002 Bayesian analysis of campus service-center demand and resolution times with PyMC (Poisson/ZIP, Gaussian/Student-t, ROPE, LOO, SLA tools). |
| Website | https://rohaan2802.github.io/Bayesian_PyMC/ |
| Topics | bayesian-statistics, pymc, arviz, mcmc, rope, jupyter-notebook, github-pages, python, mt-2002 |

---

## 14. Academic note

Numerical values in this README match the executed notebook exports in `docs/`. Re-running MCMC can create small Monte Carlo differences; conclusions are stable under the stated seed and sampler settings.
