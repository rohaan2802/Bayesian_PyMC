# i222327 — Assignment 1: Bayesian Statistical Modeling with PyMC

**Course:** MT-2002 Statistical Modeling  
**Semester:** Fall 2026  
**Instructor:** Dr. Muhammad Rizwan  
**Student ID:** i222327  
**Repository:** [https://github.com/rohaan2802/i222327_A01_A_SM](https://github.com/rohaan2802/i222327_A01_A_SM)  
**Live project page:** [https://rohaan2802.github.io/i222327_A01_A_SM/](https://rohaan2802.github.io/i222327_A01_A_SM/)  
**Full executed report:** [https://rohaan2802.github.io/i222327_A01_A_SM/notebook-report.html](https://rohaan2802.github.io/i222327_A01_A_SM/notebook-report.html)

---

## 1. Project summary

This repository contains a complete Bayesian case-study analysis for a **campus service center**. Management wants two operational answers:

1. **Demand:** How many service requests should the center expect on a typical working day?
2. **Resolution time:** How long does a selected request typically take to resolve, especially when one unusually long case appears in the data?

The work is implemented in a reproducible Python notebook using **PyMC** for Bayesian model construction and MCMC sampling, **ArviZ** for posterior summaries and diagnostics, and **Matplotlib** for exploratory and model-checking figures.

The repository is packaged as a professional deliverable:

- source notebook with executed outputs
- responsive static HTML landing page
- responsive full notebook HTML report (GitHub Pages)
- twenty labeled screenshots documenting the analysis
- dependency list and run instructions

---

## 2. Case background

A university campus service center records:

| Dataset | Size | Meaning |
|---|---:|---|
| `requests_per_day` | 40 working days | Number of requests received each day |
| `resolution_time` | 35 selected requests | Time to resolve a request (minutes) |

Important empirical features discovered in Case 1:

- request counts are small non-negative integers
- **8 of 40 days (20%)** have zero requests
- sample mean of counts is **2.95**, sample variance is **4.82** (over-dispersion relative to a simple Poisson story)
- resolution times mostly sit near the low-to-mid teens
- one observation of **42.0 minutes** is far from the main cluster and acts as an outlier for Gaussian modeling

---

## 3. Learning objectives covered

This assignment demonstrates the ability to:

- classify discrete versus continuous variables
- choose likelihoods that match the data-generating process
- specify and justify Bayesian priors
- fit Poisson, Zero-Inflated Poisson, Gaussian, and Student-*t* models in PyMC
- summarize posteriors with means and **94% HDIs**
- use posterior predictive checks to assess model adequacy
- compare models and explain the effect of an unusual observation
- apply **ROPE** (Region of Practical Equivalence) for operational decisions
- communicate an integrated statistical conclusion for non-technical stakeholders

---

## 4. Repository structure

```text
i222327_A01_A_SM/
├── README.md
├── LICENSE
├── requirements.txt
├── .gitignore
├── .nojekyll
├── index.html                      # responsive project landing page (GitHub Pages)
├── notebook-report.html            # full executed notebook as responsive HTML
├── notebook/
│   └── i222327_A01_A_SM.ipynb      # source analysis notebook
├── assets/css/site.css             # landing-page styles (mobile-first, no horizontal overflow)
└── docs/screenshots/               # 20 project screenshots used below
```

---

## 5. Methods and modeling roadmap

### Case 1 — Understanding the data
Variable classification, descriptive diagnostics, and exploratory histograms.

### Case 2 — Poisson model for daily demand
\[
y_i \sim \operatorname{Poisson}(\lambda),\quad
\lambda \sim \operatorname{Gamma}(3,1)
\]
Prior predictive checks, MCMC sampling (2 chains), posterior mean and 94% HDI for \(\lambda\).

### Case 3 — Zero-Inflated Poisson
Adds a zero-generating component to check whether zero-request days need a separate process. Compares Poisson vs ZIP using parameter tables and posterior predictive zero-day rates.

### Case 4 — Gaussian resolution-time model
\[
x_j \sim \operatorname{Normal}(\mu,\sigma)
\]
with weakly informative priors on the observed minute scale.

### Case 5 — Robust Student-*t* model
Heavy-tailed likelihood to reduce the influence of the 42-minute outlier, with \(\nu > 2\).

### Case 6 — Continuous model comparison
Compares \(\mu\) and \(\sigma\) estimates and posterior predictive behavior for Gaussian vs Student-*t*.

### Case 7 — ROPE decision analysis
Operational benchmark of **14 minutes** with ROPE intervals and sensitivity analysis.

### Case 8 + Discussion
Integrated service-center recommendation and structured discussion of priors, likelihood choice, outliers, and uncertainty communication.

---

## 6. Key numerical results (from executed notebook)

### 6.1 Exploratory diagnostics

| Quantity | Value |
|---|---:|
| Daily request mean | 2.950 |
| Daily request variance | 4.818 |
| Zero-request days | 8 (20%) |
| Resolution-time mean | 14.546 min |
| Resolution-time median | 13.800 min |
| Resolution-time SD | 4.988 min |
| Most unusual observation | 42.0 min |

### 6.2 Count-model posteriors

| Model | Parameter | Posterior mean | 94% HDI |
|---|---|---:|---|
| Poisson | \(\lambda\) | 2.955 | [2.462, 3.490] |
| ZIP | \(\psi\) | 0.796 | [0.681, 0.916] |
| ZIP | \(\lambda\) | 3.571 | [2.883, 4.179] |

Posterior predictive zero-day rates:

| Source | Zero-day rate |
|---|---:|
| Observed | 0.200 |
| Poisson PPC | 0.052 |
| ZIP PPC | 0.225 |

**Interpretation:** ZIP recovers the observed frequency of zero-request days far better than the ordinary Poisson model.

### 6.3 Continuous-model posteriors

| Model | \(\mu\) mean | \(\mu\) 94% HDI | \(\sigma\) mean | \(\nu\) mean |
|---|---:|---|---:|---:|
| Gaussian | 14.544 | [12.902, 16.166] | 5.173 | — |
| Student-*t* | 13.726 | [13.221, 14.271] | 1.362 | 2.987 |

**Interpretation:** the 42-minute case inflates Gaussian scale. Student-*t* keeps the typical-time estimate near the main cluster and is preferred for operational reporting of “usual” resolution time.

### 6.4 ROPE decisions for the 14-minute benchmark

Student-*t* \(\mu\) HDI: **[13.221, 14.271]**

| ROPE | Decision |
|---|---|
| [13.0, 15.0] | Accept practical equivalence |
| [13.5, 14.5] | Undecided |
| [13.8, 14.2] | Undecided |

---

## 7. Operational conclusions

1. **Expected demand** is only a few requests per working day (Poisson baseline \(\lambda \approx 2.96\)).
2. **Zero-request days are common enough** that a zero-inflated model is useful for demand planning and staffing buffers.
3. **Typical resolution time** is better summarized by the Student-*t* model (\(\mu \approx 13.7\) minutes) than by a Gaussian model pulled by the outlier.
4. Relative to a **14-minute** service benchmark, evidence for practical equivalence depends on ROPE width; the default ROPE [13.5, 14.5] remains **undecided**.
5. Management should report uncertainty (HDIs / predictive checks), not only point estimates.

---

## 8. Tech stack

| Layer | Tools |
|---|---|
| Language | Python 3 |
| Bayesian modeling | PyMC, PyTensor |
| Diagnostics / summaries | ArviZ |
| Data / plotting | NumPy, pandas, Matplotlib |
| Delivery | Jupyter Notebook, nbconvert HTML, GitHub Pages |
| Reproducibility | `RANDOM_SEED = 2026`, `requirements.txt` |

---

## 9. How to run locally

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
# source .venv/bin/activate

pip install -r requirements.txt
jupyter notebook notebook/i222327_A01_A_SM.ipynb
```

To regenerate the HTML report:

```bash
python -m jupyter nbconvert --to html --output-dir . --output notebook-report notebook/i222327_A01_A_SM.ipynb
```

---

## 10. GitHub Pages deployment

This project **can** be deployed on GitHub Pages because the deliverable is static HTML:

1. `index.html` — responsive project overview
2. `notebook-report.html` — full executed notebook view
3. screenshots and assets referenced by relative paths

Pages source: branch `main`, folder `/` (repository root).  
Live URL pattern: `https://rohaan2802.github.io/i222327_A01_A_SM/`

The landing page and notebook report are written to avoid horizontal overflow on small screens (`overflow-x: hidden`, fluid images/tables, wrapped code blocks).

---

## 11. Screenshot gallery (20)

### Exploratory analysis and MCMC figures

![01 requests histogram](docs/screenshots/01-requests-histogram.png)

**01 — Daily requests histogram.** Shows the discrete distribution of service demand across 40 working days, including visible zero-count days.

![02 resolution histogram](docs/screenshots/02-resolution-histogram.png)

**02 — Resolution-time histogram.** Most times concentrate near the teens; the right tail highlights the unusual 42-minute case.

![03 prior predictive](docs/screenshots/03-prior-predictive-counts.png)

**03 — Prior predictive counts.** Confirms that the Gamma(3,1) prior on \(\lambda\) generates realistic small-to-moderate daily counts before seeing the data.

![04 poisson trace](docs/screenshots/04-poisson-trace.png)

**04 — Poisson trace plot.** MCMC diagnostics for \(\lambda\) under the baseline Poisson model (multiple chains).

![05 poisson posterior](docs/screenshots/05-poisson-posterior-lambda.png)

**05 — Poisson posterior for \(\lambda\).** Posterior density used to estimate typical daily demand and uncertainty.

![06 zip ppc](docs/screenshots/06-zip-ppc-compare.png)

**06 — Count posterior predictive comparison.** Observed daily counts compared with Poisson and ZIP posterior predictive distributions.

![07 gaussian trace](docs/screenshots/07-gaussian-trace.png)

**07 — Gaussian trace plots.** Sampling diagnostics for resolution-time parameters \(\mu\) and \(\sigma\).

![08 gaussian posteriors](docs/screenshots/08-gaussian-posteriors.png)

**08 — Gaussian posterior distributions.** Shows how the normal model estimates center and scale when the outlier is included.

![09 student-t posteriors](docs/screenshots/09-student-t-posteriors.png)

**09 — Student-*t* posteriors.** Joint view of \(\mu\), \(\sigma\), and degrees of freedom \(\nu\).

![10 continuous ppc](docs/screenshots/10-continuous-ppc-compare.png)

**10 — Continuous posterior predictive comparison.** Contrasts Gaussian and Student-*t* predictive fit to observed resolution times.

### Summary boards and decision visuals

![11 dataset overview](docs/screenshots/11-dataset-overview.png)

**11 — Dataset overview board.** Request time series and resolution-time boxplot for a quick data briefing.

![12 count diagnostics](docs/screenshots/12-count-diagnostics-cards.png)

**12 — Count diagnostics cards.** Mean, variance, zero-day rate, and modeling implication at a glance.

![13 poisson vs zip](docs/screenshots/13-poisson-vs-zip-table.png)

**13 — Poisson vs ZIP parameter table.** Side-by-side posterior means and 94% HDIs for \(\lambda\) and \(\psi\).

![14 zero-day rates](docs/screenshots/14-zero-day-ppc-rates.png)

**14 — Zero-day PPC rates.** Visual proof that ZIP matches the observed 20% zero-day frequency much better than Poisson.

![15 gaussian vs student-t](docs/screenshots/15-gaussian-vs-studentt-table.png)

**15 — Gaussian vs Student-*t* table.** Highlights the drop in estimated scale when heavy tails are allowed.

![16 outlier scale effect](docs/screenshots/16-outlier-scale-effect.png)

**16 — Outlier scale effect.** Direct comparison of posterior mean \(\sigma\) under both continuous models.

![17 rope sensitivity](docs/screenshots/17-rope-sensitivity-table.png)

**17 — ROPE sensitivity table.** Shows how the practical decision changes with ROPE width around the 14-minute benchmark.

![18 workflow](docs/screenshots/18-analysis-workflow.png)

**18 — Analysis workflow.** End-to-end path from EDA to ROPE-based operational conclusion.

![19 conclusions](docs/screenshots/19-key-conclusions.png)

**19 — Key conclusions board.** Concise service-center takeaways suitable for a stakeholder slide.

![20 stack](docs/screenshots/20-stack-reproducibility.png)

**20 — Stack and reproducibility.** Libraries, delivery format, and random seed used for the study.

---

## 12. About this GitHub repository

| About field | Value |
|---|---|
| Description | MT-2002 Assignment 1: Bayesian demand & resolution-time analysis for a campus service center using PyMC (Poisson/ZIP, Gaussian/Student-t, ROPE). |
| Website | https://rohaan2802.github.io/i222327_A01_A_SM/ |
| Topics | `bayesian-statistics`, `pymc`, `arviz`, `statistical-modeling`, `poisson-regression`, `zero-inflated-poisson`, `student-t`, `rope`, `mcmc`, `jupyter-notebook`, `github-pages`, `python`, `data-analysis`, `posterior-predictive-check`, `mt-2002` |

If Pages is unavailable in a clone/fork, use the repository URL as the canonical project link:  
[https://github.com/rohaan2802/i222327_A01_A_SM](https://github.com/rohaan2802/i222327_A01_A_SM)

---

## 13. Academic integrity note

This repository presents coursework analysis for MT-2002. Numerical values shown in the README match the executed notebook outputs included in this project. Re-running MCMC may produce small Monte Carlo differences; the modeling conclusions are stable under the stated seed and sampler settings.

---

## 14. License

This project is released under the MIT License for portfolio/sharing purposes, without transferring ownership of any course materials supplied by the instructor.
