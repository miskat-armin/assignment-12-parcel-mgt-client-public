import React from "react";
import Chart from "react-apexcharts";

const BookingChart = ({ bookingData }) => {
  const dates = bookingData.map((booking) =>
    new Date(booking.requestedDeliveryDate).toLocaleDateString("en-GB")
  );
  const uniqueDates = Array.from(new Set(dates));
  const bookingCountByDate = uniqueDates.map(
    (date) => dates.filter((d) => d === date).length
  );

  const chartOptions = {
    chart: {
      id: "bookingChart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: uniqueDates,
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Bookings",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const chartSeries = [
    {
      name: "Bookings",
      data: bookingCountByDate,
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height={400}
    />
  );
};

export default BookingChart;
