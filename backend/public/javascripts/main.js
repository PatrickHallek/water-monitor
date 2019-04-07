new Chart(document.getElementById("line-chart-overview"), {
    type: 'line',
    data: {
        labels: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29],
        datasets: [{
            data: [0.7, 1, 0.6, 0.7, 0.5, 0.4, 0.5, 0.7, 0.3, 0.6, 0.7, 0.5, 0.4, 0.5, 0.4],
            label: "Liter pro Woche",
            borderColor: "#3e95cd",
            fill: true,
            backgroundColor: "rgb(143, 195, 247, 0.5)",
            pointRadius: 0
        }]
    },
    options: {
        legend: {
            display: false
        },
    }
});

new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29],
        datasets: [{
            data: [0.7, 1, 0.6, 0.7, 0.5, 0.4, 0.5, 0.7, 0.3, 0.6, 0.7, 0.5, 0.4, 0.5, 0.4],
            label: "Liter pro Woche",
            borderColor: "#3e95cd",
            fill: true,
            backgroundColor: "rgb(143, 195, 247, 0.5)",
            pointRadius: 0
        }]
    },
    options: {
        legend: {
            display: false
        },
    }
});
