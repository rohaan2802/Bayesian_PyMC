# Bayesian Campus Service Center Analysis (PyMC)

**Assignment file ID:** i222327 · A#01 · Statistical Modeling  
**Course:** MT-2002 Statistical Modeling  
**Semester:** Fall 2026  
**Instructor:** Dr. Muhammad Rizwan  
**Student ID:** i222327  
**Repository name:** `Bayesian-Campus-Service-Center-PyMC`

---

# Live Link

> Use these official entry points for the live project, report, source code, and notebook.

## Live Website (GitHub Pages)
**https://rohaan2802.github.io/Bayesian-Campus-Service-Center-PyMC/**

## Full Executed Notebook Report
**https://rohaan2802.github.io/Bayesian-Campus-Service-Center-PyMC/notebook-report.html**

## GitHub Repository
**https://github.com/rohaan2802/Bayesian-Campus-Service-Center-PyMC**

## Source Notebook (.ipynb)
**https://github.com/rohaan2802/Bayesian-Campus-Service-Center-PyMC/blob/main/notebook/i222327_A01_A_SM.ipynb**

## Screenshot Gallery
Jump to [Section 12 — Screenshot gallery](#12-screenshot-gallery-28) in this README.

---

## 1. Project summary

This repository is a **portfolio-grade, extended** solution for MT-2002 Assignment 1. It analyzes a campus service center using fully Bayesian models in **PyMC**, with diagnostics, predictive checks, formal model comparison, prior sensitivity, outlier-influence analysis, staffing/SLA decision tools, and a viva defense card.

The submission contains:

- every required assignment case (A–G / Cases 1–8 + discussion)
- **Extension Pack A** (Cases 9–15): diagnostics, LOO, sensitivity, influence, weekly demand
- **Extension Pack B** (Cases 16–20): capacity policy, SLA coverage, optimization checklist, viva card
- a responsive GitHub Pages landing site
- a responsive full HTML notebook report
- **28** labeled screenshots
- reproducible dependencies and a fixed random seed (`2026`)

---

## 2. Case background

A university campus service center wants answers to:

1. **Demand:** How many requests should be expected on a typical working day?
2. **Resolution time:** How long does a selected request typically take, especially when one extreme case appears?

| Dataset | Size | Meaning |
|---|---:|---|
| `requests_per_day` | 40 working days | Daily request counts |
| `resolution_time` | 35 selected requests | Resolution time in minutes |

Key empirical facts from exploratory analysis:

- counts are small non-negative integers
- **8/40 days (20%)** have zero requests
- sample mean **2.95**, sample variance **4.82** (over-dispersion vs pure Poisson)
- most resolution times sit near the low-to-mid teens
- one observation of **42.0 minutes** is a clear outlier for Gaussian modeling

---

## 3. What was enhanced in this version

### 3.1 Notebook optimizations
- portable PyTensor cache (no hard-coded machine paths in the shared notebook)
- shared `SAMPLE_KWARGS` (`draws=1000`, `tune=1000`, `chains=2`, `target_accept=0.9`, `log_likelihood=True`)
- helper utilities: `posterior_summary`, `rope_decision`, `quick_diag`
- stronger title / learning-objectives / discussion narrative

### 3.2 New extension cases (Cases 9–15)
| Case | Enhancement |
|---|---|
| 9 | MCMC convergence diagnostics (R-hat / ESS) |
| 10 | Formal LOO/ELPD model comparison |
| 11 | Prior sensitivity for Poisson λ |
| 12 | Outlier influence study (with vs without 42-min case) |
| 13 | Staffing risk curve + weekly demand forecast |
| 14 | Extended ROPE sensitivity + executive posterior dashboard |
| 15 | Final synthesis table + reproducibility checklist |

### 3.3 Delivery enhancements
- responsive `index.html` landing page
- responsive `notebook-report.html`
- expanded README with Live Link section and screenshot headings **above** each image

---

## 4. Learning objectives covered

- classify discrete vs continuous variables
- choose likelihoods matching the data-generating process
- specify and justify Bayesian priors
- fit Poisson, ZIP, Gaussian, and Student-*t* models in PyMC
- summarize posteriors with means and **94% HDIs**
- use posterior predictive checks
- compare models and explain outlier effects
- apply **ROPE** for practical equivalence decisions
- communicate an integrated operational conclusion
- diagnose MCMC convergence
- compare models with LOO/ELPD
- translate posteriors into staffing / weekly capacity guidance

---

## 5. Repository structure

```text
Bayesian-Campus-Service-Center-PyMC/
├── README.md
├── LICENSE
├── requirements.txt
├── .gitignore
├── .nojekyll
├── index.html
├── notebook-report.html
├── notebook/i222327_A01_A_SM.ipynb
├── assets/css/site.css
└── docs/
    ├── screenshots/             # 28 figures
    ├── enhanced_results.json
    └── decision_extension.json
```

---

## 6. Methods roadmap

### Required cases
1. **Case 1 — Data understanding:** classification, diagnostics, histograms  
2. **Case 2 — Poisson demand:** Gamma(3,1) prior, prior predictive, posterior for λ  
3. **Case 3 — ZIP:** Beta/Gamma priors, parameter comparison, PPC for zeros  
4. **Case 4 — Gaussian resolution time**  
5. **Case 5 — Student-*t* robust model**  
6. **Case 6 — Continuous model comparison + PPC**  
7. **Case 7 — ROPE vs 14-minute benchmark**  
8. **Case 8 + Discussion — Integrated decision**

### Extension pack A
9. Convergence diagnostics  
10. LOO comparison  
11. Prior sensitivity  
12. Outlier influence  
13. Staffing / weekly tools  
14. Extended ROPE + dashboard  
15. Final synthesis  

### Extension pack B
16. Capacity policy curve  
17. Resolution-time SLA coverage  
18. Computational diagnostics snapshot  
19. Workflow optimization checklist  
20. Viva / portfolio defense card  

---

## 7. Key numerical results

### 7.1 Exploratory diagnostics

| Quantity | Value |
|---|---:|
| Daily request mean | 2.950 |
| Daily request variance | 4.818 |
| Zero-request days | 8 (20%) |
| Resolution-time mean | 14.546 min |
| Resolution-time median | 13.800 min |
| Most unusual observation | 42.0 min |

### 7.2 Count-model posteriors

| Model | Parameter | Mean | 94% HDI |
|---|---|---:|---|
| Poisson | λ | 2.955 | [2.462, 3.490] |
| ZIP | ψ | 0.793 | [0.657, 0.905] |
| ZIP | λ | 3.570 | [2.937, 4.195] |

### 7.3 LOO / ELPD ranking (counts)
- **Best:** ZIP (weight ≈ 0.87)
- **Second:** Poisson (ELPD difference ≈ −6.0)

### 7.4 Continuous-model posteriors

| Model | μ mean | μ 94% HDI | σ mean | ν mean |
|---|---:|---|---:|---:|
| Gaussian | 14.517 | [12.907, 16.254] | 5.157 | — |
| Student-*t* | 13.710 | [13.135, 14.259] | 1.359 | 2.965 |

### 7.5 LOO / ELPD ranking (continuous)
- **Best:** Student-*t* (weight ≈ 1.0)
- Gaussian is strongly worse (ELPD difference ≈ −40)

### 7.6 Weekly demand (5 working days, Poisson posterior predictive)

| Quantity | Value |
|---|---:|
| Mean weekly requests | 14.74 |
| 94% HDI | [7, 22] |
| P(weekly ≥ 20) | 0.126 |
| P(weekly ≥ 25) | 0.020 |

### 7.7 ROPE decisions for Student-*t* μ

Student-*t* μ HDI ≈ **[13.135, 14.259]**

| ROPE | Decision |
|---|---|
| [13.0, 15.0] | Accept practical equivalence |
| [13.5, 14.5] | Undecided |
| [13.8, 14.2] | Undecided |
| [12.5, 15.5] | Accept practical equivalence |

---

## 8. Operational conclusions

1. Typical daily demand is about **3 requests/day** (Poisson λ ≈ 2.96).  
2. Quiet days matter: ZIP recovers the observed **20%** zero-day rate much better than Poisson.  
3. Typical resolution time is better summarized by Student-*t* (**μ ≈ 13.7 min**).  
4. The 42-minute case should be treated as an escalation event, not the new baseline.  
5. Against a **14-minute** benchmark, the default ROPE [13.5, 14.5] remains **Undecided**.  
6. Weekly planning can use the predictive total-demand distribution rather than λ alone.

---

## 9. Tech stack

| Layer | Tools |
|---|---|
| Language | Python 3 |
| Modeling | PyMC + PyTensor |
| Diagnostics | ArviZ (summary / LOO compare) |
| Data / plots | NumPy, pandas, Matplotlib |
| Delivery | Jupyter + nbconvert HTML + GitHub Pages |
| Reproducibility | `RANDOM_SEED = 2026`, `requirements.txt` |

---

## 10. How to run locally

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

---

## 11. GitHub Pages deployment notes

This project is deployable on GitHub Pages as **static HTML**:

1. `index.html` — responsive overview  
2. `notebook-report.html` — full executed notebook  
3. screenshot assets via relative paths  

Pages source: `main` branch, root `/`.  
If Pages is temporarily unavailable, use the repository URL as the canonical project link.

Responsive safeguards:

- viewport meta tag
- `overflow-x: hidden` on page shell
- fluid images/tables
- wrapped code blocks

---

## 12. Screenshot gallery (28)

Headings are placed **above** each screenshot.

### 12.1 Core analysis figures

### 01 — Daily requests histogram
Discrete demand distribution across 40 working days, including visible zero-count days.

![01 requests histogram](docs/screenshots/01-requests-histogram.png)

### 02 — Resolution-time histogram
Continuous times concentrated near the teens, with a right-tail outlier at 42 minutes.

![02 resolution histogram](docs/screenshots/02-resolution-histogram.png)

### 03 — Prior predictive counts
Checks that Gamma(3,1) on λ produces realistic small-to-moderate daily counts before seeing data.

![03 prior predictive](docs/screenshots/03-prior-predictive-counts.png)

### 04 — Poisson trace plot
MCMC mixing diagnostics for λ under the baseline Poisson model.

![04 poisson trace](docs/screenshots/04-poisson-trace.png)

### 05 — Poisson posterior for λ
Posterior density used for the baseline expected daily demand.

![05 poisson posterior](docs/screenshots/05-poisson-posterior-lambda.png)

### 06 — Count posterior predictive comparison
Observed daily counts versus Poisson and ZIP posterior predictive distributions.

![06 zip ppc](docs/screenshots/06-zip-ppc-compare.png)

### 07 — Gaussian trace plots
Sampling diagnostics for resolution-time parameters μ and σ.

![07 gaussian trace](docs/screenshots/07-gaussian-trace.png)

### 08 — Gaussian posterior distributions
Center and scale under a normal-error assumption (outlier-sensitive).

![08 gaussian posteriors](docs/screenshots/08-gaussian-posteriors.png)

### 09 — Student-*t* posteriors
Joint view of μ, σ, and degrees of freedom ν under heavy tails.

![09 student-t posteriors](docs/screenshots/09-student-t-posteriors.png)

### 10 — Continuous posterior predictive comparison
Gaussian versus Student-*t* predictive fit to observed resolution times.

![10 continuous ppc](docs/screenshots/10-continuous-ppc-compare.png)

### 12.2 Summary boards

### 11 — Dataset overview board
Request series and resolution-time boxplot for a quick data briefing.

![11 dataset overview](docs/screenshots/11-dataset-overview.png)

### 12 — Count diagnostics cards
Mean, variance, zero-day rate, and modeling implication at a glance.

![12 count diagnostics](docs/screenshots/12-count-diagnostics-cards.png)

### 13 — Poisson vs ZIP parameter table
Side-by-side posterior means and 94% HDIs for λ and ψ.

![13 poisson vs zip](docs/screenshots/13-poisson-vs-zip-table.png)

### 14 — Zero-day PPC rates
ZIP matches the observed 20% zero-day frequency much better than Poisson.

![14 zero-day rates](docs/screenshots/14-zero-day-ppc-rates.png)

### 15 — Gaussian vs Student-*t* table
Highlights the drop in estimated scale when heavy tails are allowed.

![15 gaussian vs student-t](docs/screenshots/15-gaussian-vs-studentt-table.png)

### 16 — Outlier scale effect
Direct comparison of posterior mean σ under both continuous models.

![16 outlier scale effect](docs/screenshots/16-outlier-scale-effect.png)

### 17 — ROPE sensitivity table
Shows how the practical decision changes with ROPE width around the 14-minute benchmark.

![17 rope sensitivity](docs/screenshots/17-rope-sensitivity-table.png)

### 18 — Analysis workflow
End-to-end path from EDA through ROPE-based operational conclusion.

![18 workflow](docs/screenshots/18-analysis-workflow.png)

### 19 — Key conclusions board
Concise service-center takeaways suitable for a stakeholder slide.

![19 conclusions](docs/screenshots/19-key-conclusions.png)

### 20 — Stack and reproducibility
Libraries, delivery format, and random seed used for the study.

![20 stack](docs/screenshots/20-stack-reproducibility.png)

### 12.3 Enhancement-pack figures

### 21 — Enhanced posterior dashboard
Compact stakeholder view of Poisson λ, ZIP ψ, Student-*t* μ, and ν.

![21 enhanced dashboard](docs/screenshots/21-enhanced-posterior-dashboard.png)

### 22 — Prior sensitivity for Poisson λ
Posterior mean of λ remains stable across several Gamma prior choices.

![22 prior sensitivity](docs/screenshots/22-prior-sensitivity-lambda.png)

### 23 — Staffing risk curve
Posterior predictive probabilities that daily demand meets or exceeds threshold k.

![23 staffing risk](docs/screenshots/23-staffing-risk-curve.png)

### 24 — Weekly demand forecast
Predictive distribution of total requests over 5 working days.

![24 weekly demand](docs/screenshots/24-weekly-demand-forecast.png)

### 25 — Outlier influence on Student-*t* μ
With vs without the 42-minute observation; robust likelihood keeps μ stable.

![25 outlier influence](docs/screenshots/25-outlier-influence-mu.png)

### 26 — Capacity policy curve
Daily staffing buffer guidance from posterior predictive exceedance probabilities.

![26 capacity policy](docs/screenshots/26-capacity-policy-curve.png)

### 27 — Resolution-time SLA coverage
Probability of meeting common minute-based service targets under Student-*t*.

![27 sla coverage](docs/screenshots/27-resolution-sla-coverage.png)

### 28 — Optimization checklist
Sampler/workflow optimizations used for reproducibility and reviewer clarity.

![28 optimization checklist](docs/screenshots/28-optimization-checklist.png)

---

## 13. About this GitHub repository

| About field | Value |
|---|---|
| Name | `Bayesian-Campus-Service-Center-PyMC` |
| Description | MT-2002 Bayesian analysis of campus service-center demand and resolution times with PyMC (Poisson/ZIP, Gaussian/Student-t, ROPE, LOO, SLA tools). |
| Website / Live | https://rohaan2802.github.io/Bayesian-Campus-Service-Center-PyMC/ |
| Topics | `bayesian-statistics`, `pymc`, `arviz`, `statistical-modeling`, `poisson`, `zero-inflated-poisson`, `student-t`, `rope`, `mcmc`, `jupyter-notebook`, `github-pages`, `python`, `data-analysis`, `posterior-predictive-check`, `mt-2002` |

---

## 14. Academic integrity / reproducibility note

Numerical values in this README match the executed notebook / enhancement outputs stored in the repository. Re-running MCMC can produce small Monte Carlo differences; modeling conclusions are stable under the stated seed and sampler settings.

---

## 15. License

MIT License for portfolio sharing, without transferring ownership of instructor-provided course materials.
