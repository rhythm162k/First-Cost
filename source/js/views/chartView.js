import Chart from "chart.js/auto";

class ChartView {
  _expenseChartEl = document.querySelector("#expenseChart");
  _monthlyChartEl = document.querySelector("#monthlyChart");
  body = document.querySelector("body");
  emptyStats = document.querySelector(".empty-stats");
  chartPlaceHolder = document.querySelectorAll(".chart-placeholder");
  _chartInstance = null;
  _monthlyChart = null;

  noTransactionState() {
    this.chartPlaceHolder.forEach((placeholder) =>
      placeholder.classList.add("hidden")
    );
    this.emptyStats.classList.remove("hidden");
  }

  transactionState() {
    this.chartPlaceHolder.forEach((placeholder) =>
      placeholder.classList.remove("hidden")
    );
    this.emptyStats.classList.add("hidden");
  }

  statsState(data) {
    data.length === 0 ? this.noTransactionState() : this.transactionState();
  }

  renderExpenseChart(labels, data) {
    if (!this._chartInstance) {
      this._chartInstance = new Chart(this._expenseChartEl, {
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              data,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: getComputedStyle(this.body)
                  .getPropertyValue("--text")
                  .trim(),
              },
            },
          },
        },
      });

      return;
    }

    // update existing chart
    this._chartInstance.data.labels = labels;
    this._chartInstance.data.datasets[0].data = data;

    this._chartInstance.update();
  }

  renderMonthlyChart(labels, incomeData, expenseData, savingsData) {
    if (!this._monthlyChart) {
      this._monthlyChart = new Chart(this._monthlyChartEl, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Income",
              data: incomeData,
              fill: false,
            },
            {
              label: "Expense",
              data: expenseData,
              fill: false,
            },
            {
              label: "Savings",
              data: savingsData,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: getComputedStyle(this.body)
                  .getPropertyValue("--text")
                  .trim(),
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: getComputedStyle(this.body)
                  .getPropertyValue("--text")
                  .trim(),
              },
            },
            y: {
              ticks: {
                color: getComputedStyle(this.body)
                  .getPropertyValue("--text")
                  .trim(),
              },
            },
          },
        },
      });

      return;
    }

    this._monthlyChart.data.labels = labels;

    this._monthlyChart.data.datasets[0].data = incomeData;
    this._monthlyChart.data.datasets[1].data = expenseData;
    this._monthlyChart.data.datasets[2].data = savingsData;

    this._monthlyChart.update();
  }

  updateColors() {
    const textColor = getComputedStyle(this.body)
      .getPropertyValue("--text")
      .trim();

    this._chartInstance.options.plugins.legend.labels.color = textColor;
    this._chartInstance.update();
    this._monthlyChart.options.plugins.legend.labels.color = textColor;
    this._monthlyChart.options.scales.x.ticks.color = textColor;
    this._monthlyChart.options.scales.y.ticks.color = textColor;
    this._monthlyChart.update();
  }
}

export default new ChartView();
