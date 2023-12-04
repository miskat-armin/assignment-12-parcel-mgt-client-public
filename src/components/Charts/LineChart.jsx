import React from "react";
import Chart from "react-apexcharts";

const BookingComparisonChart = ({ bookingData }) => {
  // Extract dates and count booked and delivered parcels for each date
  const dates = bookingData.map((booking) => new Date(booking.requestedDeliveryDate).toLocaleDateString("en-GB"));
  const uniqueDates = Array.from(new Set(dates));

  const bookedCountByDate = uniqueDates.map(
    (date) => dates.filter((d) => d === date && bookingData.find((booking) => booking.status !== "Delivered"))
      .length
  );

  const deliveredCountByDate = uniqueDates.map(
    (date) => dates.filter((d) => d === date && bookingData.find((booking) => booking.status === "Delivered"))
      .length
  );

  const chartOptions = {
    chart: {
      id: "bookingComparisonChart",
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
        text: "Number of Parcels",
      },
    },
    plotOptions: {
      line: {
        curve: "smooth",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const chartSeries = [
    {
      name: "Booked Parcels",
      data: bookedCountByDate,
    },
    {
      name: "Delivered Parcels",
      data: deliveredCountByDate,
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={400}
    />
  );
};

export default BookingComparisonChart;
