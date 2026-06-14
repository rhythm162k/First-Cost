import Chart from "chart.js/auto";

class ChartView {
  _expenseChartEl = document.querySelector("#expenseChart");
  _chartInstance = null;

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
        },
      });

      return;
    }

    this._monthlyChart.data.labels = labels;
    this._monthlyChart.data.datasets[0].data = data;
    this._monthlyChart.update();
  }
}

export default new ChartView();
