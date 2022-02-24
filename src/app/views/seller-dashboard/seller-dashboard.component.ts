import { Component, OnInit } from '@angular/core';

import {  Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";

import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets"
import { CustomerService } from 'src/app/shared/customer.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {

  private chart: am4charts.XYChart;
  photographers=[];
  profileurl: string;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,private service:CustomerService,private router:Router) { }
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

 "" 
                                            
  ngAfterViewInit() {
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdivreviewp", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;
    });

         this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("latestorders", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;
    });
                 this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("quotationreqs", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;
    });

            this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdivreviews", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;
    });


  		//pi-chart
        this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;
    });
    	//pi-chart
        this.browserOnly(() => {
          am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("chartdiv2", am4charts.XYChart);

// Add data
chart.data = [
  {date:new Date(2019,5,12), value1:"50%", value2:"48%", previousDate:new Date(2019, 5, 5)},
  {date:new Date(2019,5,13), value1:"53%", value2:"51%", previousDate:new Date(2019, 5, 6)},
  {date:new Date(2019,5,14), value1:"56%", value2:"58%", previousDate:new Date(2019, 5, 7)},
  {date:new Date(2019,5,15), value1:"52%", value2:"53%", previousDate:new Date(2019, 5, 8)},
  {date:new Date(2019,5,16), value1:"48%", value2:"44%", previousDate:new Date(2019, 5, 9)},
  {date:new Date(2019,5,17), value1:"47%", value2:"42%", previousDate:new Date(2019, 5, 10)},
  {date:new Date(2019,5,18), value1:"59%", value2:"55%", previousDate:new Date(2019, 5, 11)}
]

// Create axes
let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
let series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "value1";
series.dataFields.dateX = "date";
series.strokeWidth = 2;
series.minBulletDistance = 10;
series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
series.tooltip.pointerOrientation = "vertical";

// Create series
let series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "value2";
series2.dataFields.dateX = "date";
series2.strokeWidth = 2;
series2.strokeDasharray = "3,4";
series2.stroke = series.stroke;

// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;

      
    });

     this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv5", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;
    });

      this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv6", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;
    });
    // this.browserOnly(() => {
    //   am4core.useTheme(am4themes_animated);

    //   let chart = am4core.create("chartdiv2", am4charts.XYChart);

    //   chart.paddingRight = 20;

    //   let data = [];
    //   let visits = 10;
    //   for (let i = 1; i < 366; i++) {
    //     visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    //     data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
    //   }

    //   chart.data = data;

    //   let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    //   dateAxis.renderer.grid.template.location = 0;

    //   let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //   valueAxis.tooltip.disabled = true;
    //   valueAxis.renderer.minWidth = 35;

    //   let series = chart.series.push(new am4charts.LineSeries());
    //   series.dataFields.dateX = "date";
    //   series.dataFields.valueY = "value";
    //   series.tooltipText = "{valueY.value}";

    //   chart.cursor = new am4charts.XYCursor();

    //   this.chart = chart;
    // });
// Themes end

// Create map instance
let chartN = am4core.create("chartdiv7", am4maps.MapChart);
chartN.geodata = am4geodata_continentsLow;
chartN.projection = new am4maps.projections.Miller();

// Colors
let color1 = chartN.colors.getIndex(0);

chartN.homeGeoPoint = {
  latitude: 50,
  longitude: 0
}
chartN.homeZoomLevel = 0.75;
chartN.minZoomLevel = 0.75;

// Create map polygon series
let polygonSeries = chartN.series.push(new am4maps.MapPolygonSeries());
polygonSeries.exclude = ["antarctica"];
polygonSeries.useGeodata = true;

// Configure series
let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.fill = am4core.color("#f8f8f8");

// Add shadow
let shadow = polygonSeries.filters.push(new am4core.DropShadowFilter());
shadow.color = am4core.color("#60666b");
shadow.blur = 0;

// Pins
let imageSeries = chartN.series.push(new am4maps.MapImageSeries());
let imageTemplate = imageSeries.mapImages.template;
imageTemplate.propertyFields.longitude = "longitude";
imageTemplate.propertyFields.latitude = "latitude";
imageTemplate.nonScaling = true;

// Creating a pin bullet
let pin = imageTemplate.createChild(am4plugins_bullets.PinBullet);

// Configuring pin appearance
pin.background.fill = color1;
pin.background.pointerBaseWidth = 1;
pin.background.pointerLength = 250;
pin.background.propertyFields.pointerLength = "length";
pin.circle.fill = pin.background.fill;
pin.label = new am4core.Label();
pin.label.text = "{value}%";
//pin.label.fill = color1.alternate;

let label = pin.createChild(am4core.Label);
label.text = "{title}";
label.fontWeight = "bold";
label.propertyFields.dy = "length";
label.verticalCenter = "middle";
label.fill = color1;
label.adapter.add("dy", function(dy) {
  return (20 + dy) * -1;
});

// Creating a "heat rule" to modify "radius" of the bullet based
// on value in data
imageSeries.heatRules.push({
  "target": pin.background,
  "property": "radius",
  "min": 20,
  "max": 30,
  "dataField": "value"
});

imageSeries.heatRules.push({
  "target": label,
  "property": "dx",
  "min": 30,
  "max": 40,
  "dataField": "value"
});

imageSeries.heatRules.push({
  "target": label,
  "property": "paddingBottom",
  "min": 0,
  "max": 10,
  "dataField": "value"
});

// Pin data
imageSeries.data = [{
  "latitude": 40,
  "longitude": -101,
  "value": 12,
  "title": "United\nStates",
  "length": 150
}, {
  "latitude": 0,
  "longitude": 25,
  "value": 5,
  "title": "Africa",
  "length": 40
}, {
  "latitude": 43,
  "longitude": 5,
  "value": 15,
  "title": "European\nUnion",
  "length": 100
}, {
  "latitude": 40,
  "longitude": 95,
  "value": 8,
  "title": "Asia",
  "length": 80
}];

  }

  ngOnDestroy() {
    // Clean up chartN when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
  

  // chart-2
ngOnInit() {
  this.profileurl=environment.profileUrl
  this.getTopPhtographers()

  }
  getTopPhtographers(){
    this.service.top10Photographers().subscribe(data=>{
      console.log("fsdfgsedf",data);
      this.photographers=data.data
    })
  }
  photographerDetails(id){
    this.router.navigate([`/photographer-detail/${id}`])
  }

}

