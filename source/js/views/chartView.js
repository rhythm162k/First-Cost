import Chart from "chart.js/auto";

class ChartView {
  _expenseChartEl = document.querySelector("#expenseChart");
  _chartInstance = null;
  _monthlyChart = null;

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
                color: getComputedStyle(document.querySelector("body"))
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

  renderMonthlyChart(labels, data) {
    if (!this._monthlyChart) {
      this._monthlyChart = new Chart(document.querySelector("#monthlyChart"), {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Monthly Total",
              data,
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
                color: getComputedStyle(document.querySelector("body"))
                  .getPropertyValue("--text")
                  .trim(),
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: getComputedStyle(document.querySelector("body"))
                  .getPropertyValue("--text")
                  .trim(),
              },
            },
            y: {
              ticks: {
                color: getComputedStyle(document.querySelector("body"))
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
    this._monthlyChart.data.datasets[0].data = data;
    this._monthlyChart.update();
  }

  updateColors() {
    const textColor = getComputedStyle(document.querySelector("body"))
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
