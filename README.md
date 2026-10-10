# Bayesian Campus Service Center Analysis (PyMC)

**Assignment:** MT-2002 Statistical Modeling · A#01  
**Student ID:** i222327  
**Semester:** Fall 2026  
**Instructor:** Dr. Muhammad Rizwan  
**Source notebook:** `notebook/i222327_A01_A_SM.ipynb` (156 cells)  
**Repository:** [`Bayesian-PyMC`](https://github.com/rohaan2802/Bayesian-PyMC)

---

# Live Link

> Final project entry points — use these links for review, demo, and submission.

## Live Website
**https://rohaan2802.github.io/Bayesian-PyMC/**

## Operations Decision Dashboard
**https://rohaan2802.github.io/Bayesian-PyMC/dashboard.html**

## Full Executed Notebook Report
**https://rohaan2802.github.io/Bayesian-PyMC/notebook-report.html**

## GitHub Repository
**https://github.com/rohaan2802/Bayesian-PyMC**

## Source Notebook
**https://github.com/rohaan2802/Bayesian-PyMC/blob/main/notebook/i222327_A01_A_SM.ipynb**

## Screenshot Gallery
See [Section 8](#8-screenshot-gallery-aligned-to-final-notebook) below.

---

## 1. Final notebook map

This README is aligned to the **final notebook** structure.

### Required assignment block
| Notebook section | Content |
|---|---|
| Case 1 | Data understanding, diagnostics, exploratory plots |
| Case 2 | Poisson demand model + prior predictive + posterior |
| Case 3 | Zero-Inflated Poisson + PPC comparison |
| Case 4 | Gaussian resolution-time model |
| Case 5 | Student-*t* robust resolution-time model |
| Case 6 | Continuous model comparison + PPC |
| Case 7 | ROPE decision vs 14-minute benchmark |
| Case 8 + Discussion | Integrated operational conclusion |

### Extension Pack A (Cases 9–15)
Diagnostics, LOO/ELPD, prior sensitivity, outlier influence, weekly demand, executive posterior board, synthesis.

### Extension Pack B (Cases 16–20)
Capacity policy curve, SLA coverage, computational diagnostics, optimization checklist, viva defense card.

### Extension Pack C (Cases 21–30)
PPC report cards, PIT calibration, staffing utility, weekday hierarchical proxy, leave-future-out check, model weights, executive one-pager, completeness matrix, hard-stop.

---

## 2. Case study in one page

A campus service center wants:

1. **Demand:** typical daily request rate  
2. **Resolution time:** typical handling time under one extreme 42-minute case  

| Dataset | n | Role |
|---|---:|---|
| `requests_per_day` | 40 | Daily demand counts |
| `resolution_time` | 35 | Resolution times (minutes) |

Observed highlights:

- mean demand **2.95**/day, variance **4.82**
- **20%** zero-request days
- resolution median **13.8** min; outlier **42.0** min

---

## 3. Key results from the final notebook

### Demand models
| Model | Key posterior | Practical read |
|---|---|---|
| Poisson | λ = **2.955**, 94% HDI [2.462, 3.490] | Baseline daily demand ≈ 3 |
| ZIP | ψ = **0.793**, λ = **3.570** | Better calibration of quiet (zero) days |

PPC zero-day rates: observed **0.200** · Poisson **0.053** · ZIP **0.231**

### Resolution-time models
| Model | μ mean | σ mean | Notes |
|---|---:|---:|---|
| Gaussian | 14.517 | 5.157 | Outlier inflates scale |
| Student-*t* | **13.710** | **1.359** | Preferred typical-time model (ν ≈ 2.97) |

### Decisions
| Decision tool | Final notebook outcome |
|---|---|
| ROPE [13.5, 14.5] vs 14-min benchmark | **Undecided** |
| Utility-optimal staff capacity | **4** request-slots/day |
| Preferred count model | **ZIP** |
| Preferred continuous model | **Student-*t*** |
| Leave-future-out (30/10) | test mean 3.3; mean log pred. density −2.46 |

---

## 4. How to run

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
jupyter notebook notebook/i222327_A01_A_SM.ipynb
```

Regenerate HTML report:

```bash
python -m jupyter nbconvert --to html --output-dir . --output notebook-report notebook/i222327_A01_A_SM.ipynb
```

Seed: `RANDOM_SEED = 2026`  
Sampler defaults: `draws=1000`, `tune=1000`, `chains=2`, `target_accept=0.9`

---

## 5. Repository layout

```text
Bayesian-PyMC/
├── README.md
├── LICENSE
├── requirements.txt
├── index.html                 # live landing page
├── dashboard.html             # operations decision dashboard
├── notebook-report.html       # full executed notebook
├── notebook/i222327_A01_A_SM.ipynb
├── assets/css/site.css
└── docs/
    ├── screenshots/           # 01–36 (below)
    ├── enhanced_results.json
    ├── decision_extension.json
    └── saturation_results.json
```

---

## 6. Tech stack

Python · NumPy · pandas · Matplotlib · SciPy · PyMC · PyTensor · ArviZ · Jupyter · GitHub Pages

---

## 7. About fields

| Field | Value |
|---|---|
| Name | `Bayesian-PyMC` |
| Description | MT-2002 Bayesian analysis of campus service-center demand and resolution times with PyMC (Poisson/ZIP, Gaussian/Student-t, ROPE, LOO, SLA tools). |
| Website | https://rohaan2802.github.io/Bayesian-PyMC/ |
| Topics | bayesian-statistics, pymc, arviz, mcmc, rope, jupyter-notebook, github-pages, python, mt-2002 |

---

## 8. Screenshot gallery (aligned to final notebook)

Every heading is placed **above** its screenshot. Order follows the notebook story.

### A) Required analysis figures (Cases 1–6)

### 01 — Daily requests histogram
Case 1 exploratory plot for discrete demand.

![01](docs/screenshots/01-requests-histogram.png)

### 02 — Resolution-time histogram
Case 1 exploratory plot showing the 42-minute outlier.

![02](docs/screenshots/02-resolution-histogram.png)

### 03 — Prior predictive counts
Case 2 prior predictive check for Poisson demand.

![03](docs/screenshots/03-prior-predictive-counts.png)

### 04 — Poisson trace plot
Case 2 MCMC diagnostics for λ.

![04](docs/screenshots/04-poisson-trace.png)

### 05 — Poisson posterior for λ
Case 2 posterior density for daily demand rate.

![05](docs/screenshots/05-poisson-posterior-lambda.png)

### 06 — Count PPC comparison
Case 3 observed counts vs Poisson/ZIP predictions.

![06](docs/screenshots/06-zip-ppc-compare.png)

### 07 — Gaussian trace plots
Case 4 MCMC diagnostics for μ and σ.

![07](docs/screenshots/07-gaussian-trace.png)

### 08 — Gaussian posteriors
Case 4 parameter uncertainty under normal errors.

![08](docs/screenshots/08-gaussian-posteriors.png)

### 09 — Student-*t* posteriors
Case 5 posteriors for μ, σ, and ν.

![09](docs/screenshots/09-student-t-posteriors.png)

### 10 — Continuous PPC comparison
Case 6 Gaussian vs Student-*t* predictive fit.

![10](docs/screenshots/10-continuous-ppc-compare.png)

### B) Summary boards for Cases 1–8

### 11 — Dataset overview
Compact briefing board for the two observed series.

![11](docs/screenshots/11-dataset-overview.png)

### 12 — Count diagnostics cards
Mean, variance, zero-day rate, and modeling implication.

![12](docs/screenshots/12-count-diagnostics-cards.png)

### 13 — Poisson vs ZIP table
Side-by-side posterior means and 94% HDIs.

![13](docs/screenshots/13-poisson-vs-zip-table.png)

### 14 — Zero-day PPC rates
ZIP recovers the observed 20% quiet-day rate.

![14](docs/screenshots/14-zero-day-ppc-rates.png)

### 15 — Gaussian vs Student-*t* table
Continuous-model comparison used in Case 6.

![15](docs/screenshots/15-gaussian-vs-studentt-table.png)

### 16 — Outlier scale effect
Why Gaussian σ inflates under the 42-minute case.

![16](docs/screenshots/16-outlier-scale-effect.png)

### 17 — ROPE sensitivity table
Case 7 practical-equivalence decisions around 14 minutes.

![17](docs/screenshots/17-rope-sensitivity-table.png)

### 18 — Analysis workflow
End-to-end path from EDA to ROPE conclusion.

![18](docs/screenshots/18-analysis-workflow.png)

### 19 — Key conclusions board
Case 8 style operational takeaways.

![19](docs/screenshots/19-key-conclusions.png)

### 20 — Stack and reproducibility
Libraries, delivery format, and seed used in the final notebook.

![20](docs/screenshots/20-stack-reproducibility.png)

### C) Extension Pack A (Cases 9–15)

### 21 — Enhanced posterior dashboard
Stakeholder board for λ, ψ, μ, and ν.

![21](docs/screenshots/21-enhanced-posterior-dashboard.png)

### 22 — Prior sensitivity for λ
Case 11 stability check across Gamma priors.

![22](docs/screenshots/22-prior-sensitivity-lambda.png)

### 23 — Staffing risk curve
Case 13 daily exceedance probabilities P(Y ≥ k).

![23](docs/screenshots/23-staffing-risk-curve.png)

### 24 — Weekly demand forecast
Case 13 five-day total demand predictive distribution.

![24](docs/screenshots/24-weekly-demand-forecast.png)

### 25 — Outlier influence on μ
Case 12 Student-*t* μ with vs without the 42-minute case.

![25](docs/screenshots/25-outlier-influence-mu.png)

### D) Extension Pack B (Cases 16–20)

### 26 — Capacity policy curve
Case 16 staffing-buffer policy view.

![26](docs/screenshots/26-capacity-policy-curve.png)

### 27 — Resolution-time SLA coverage
Case 17 probability of meeting minute-based SLA cutoffs.

![27](docs/screenshots/27-resolution-sla-coverage.png)

### 28 — Optimization checklist
Case 19 sampler/workflow reproducibility checklist.

![28](docs/screenshots/28-optimization-checklist.png)

### E) Extension Pack C (Cases 21–30)

### 29 — PIT calibration (count models)
Case 22 calibration histograms for Poisson vs ZIP.

![29](docs/screenshots/29-pit-count-models.png)

### 30 — PIT calibration (continuous models)
Case 22 calibration histograms for Gaussian vs Student-*t*.

![30](docs/screenshots/30-pit-continuous-models.png)

### 31 — Staffing utility curve
Case 23 relative-cost optimum at staff level **4**.

![31](docs/screenshots/31-staffing-utility-curve.png)

### 32 — Weekday hierarchical rates
Case 24 partially pooled day-type demand proxy.

![32](docs/screenshots/32-weekday-hierarchical-rates.png)

### 33 — Model comparison weights
Case 26 ZIP vs Poisson predictive weights.

![33](docs/screenshots/33-model-comparison-weights.png)

### 34 — Executive one-pager
Case 28 single-screen saturated workflow summary.

![34](docs/screenshots/34-executive-one-pager.png)

### 35 — Completeness matrix
Case 29 saturation declaration across enhancement surfaces.

![35](docs/screenshots/35-completeness-matrix.png)

### 36 — Leave-future-out split
Case 25 chronological 30/10 train-test demand check.

![36](docs/screenshots/36-leave-future-out-split.png)

---

## 9. Notes

- Screenshot captions and section labels match the **final notebook** case order.
- Numerical values come from the executed notebook exports in `docs/`.
- Contributor identity on GitHub is the repository owner only.
- Further modeling upgrades require richer data (calendar labels, real costs, multi-site series), not more notebook scaffolding.
