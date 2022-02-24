import { Component, OnInit } from '@angular/core';

import {  Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-consultant-dashboard',
  templateUrl: './consultant-dashboard.component.html',
  styleUrls: ['./consultant-dashboard.component.scss']
})
export class ConsultantDashboardComponent implements OnInit {

  private chart: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
   ngAfterViewInit() {
   		//pi-chart
        this.browserOnly(() => {
          am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add data
         chart.data = [{
          "country": "Kitchen",
          "litres": 501.9
        }, {
          "country": "Dinning room",
          "litres": 301.9
        }, {
          "country": "Bath",
          "litres": 201.1
        }, {
          "country": "Bedroom",
          "litres": 165.8
        }, {
          "country": "living",
          "litres": 139.9
        }, {
          "country": "Corridor",
          "litres": 128.3
        },{
          "country": "Corridor",
          "litres": 128.3
        },{
          "country": "Home & Office",
          "litres": 128.3
        },{
          "country": "Home Bar",
          "litres": 128.3
        }];

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";

        pieSeries.ticks.template.disabled = true;
        pieSeries.alignLabels = false;
        pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
        pieSeries.labels.template.radius = am4core.percent(-40);
        pieSeries.labels.template.fill = am4core.color("white");
        pieSeries.labels.template.relativeRotation = 90;
      
    });

    	//pi-chart
        this.browserOnly(() => {
          am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv2", am4charts.PieChart);

        // Add data
        chart.data = [{
          "country": "Kitchen",
          "litres": 501.9
        }, {
          "country": "Dinning room",
          "litres": 301.9
        }, {
          "country": "Bath",
          "litres": 201.1
        }, {
          "country": "Bedroom",
          "litres": 165.8
        }, {
          "country": "living",
          "litres": 139.9
        }, {
          "country": "Corridor",
          "litres": 128.3
        },{
          "country": "Corridor",
          "litres": 128.3
        },{
          "country": "Home & Office",
          "litres": 128.3
        },{
          "country": "Home Bar",
          "litres": 128.3
        }];

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";

        pieSeries.ticks.template.disabled = true;
        pieSeries.alignLabels = false;
        pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
        pieSeries.labels.template.radius = am4core.percent(-40);
        pieSeries.labels.template.fill = am4core.color("white");
        pieSeries.labels.template.relativeRotation = 90;
      
    });
}

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  ngOnInit(): void {
  }

}
