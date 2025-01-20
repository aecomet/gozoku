import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Schedule } from '@src/types/Schedule.ts';
import * as L from 'leaflet';

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './Schedule.component.html',
  styleUrl: './Schedule.component.scss',
  imports: [MatCardModule, MatGridListModule]
})
export class AppSchedule {
  schedules: Schedule[] = [
    {
      id: 1,
      title: '豪族会',
      date: '2018-07-20 ~ 2018-07-21',
      place: '不明',
      lat: 0,
      lng: 0
    },
    {
      id: 2,
      title: '豪族会',
      date: '2018-12-29',
      place: 'みなとみらい',
      lat: 35.459904,
      lng: 139.634146
    },
    {
      id: 3,
      title: 'プチ豪族会',
      date: '2019-08-17',
      place: 'NIKU ROCK 新宿西口店',
      lat: 35.695356,
      lng: 139.697894
    },
    {
      id: 4,
      title: '豪族会 夏の陣',
      date: '2019-08-31',
      place: '炭の談笑屋 新橋店',
      lat: 35.66522,
      lng: 139.757289
    },
    {
      id: 5,
      title: '豪族会 冬の陣',
      date: '2019-12-15',
      place: 'BARBARA market place 151 新丸ビル店',
      lat: 35.682984,
      lng: 139.764269
    },
    {
      id: 6,
      title: 'プチ豪族会',
      date: '2020-03-14',
      place: '池田別邸',
      lat: 0,
      lng: 0
    },
    {
      id: 7,
      title: '豪族会',
      date: '2020-08-14',
      place: '不明',
      lat: 0,
      lng: 0
    },
    {
      id: 8,
      title: '豪族会',
      date: '2020-12-30',
      place: '不明',
      lat: 0,
      lng: 0
    },
    {
      id: 9,
      title: '豪族会',
      date: '2021-06-11',
      place: 'オンライン',
      lat: 0,
      lng: 0
    },
    {
      id: 10,
      title: '帰ってきた豪族会2021',
      date: '2021-12-11',
      place: '全席個室 楽蔵うたげ 八重洲店',
      lat: 35.680594,
      lng: 139.771139
    },
    {
      id: 11,
      title: '豪族会',
      date: '2022-07-17',
      place: '権之介 横浜西口店',
      lat: 35.467302,
      lng: 139.622143
    },
    {
      id: 12,
      title: '豪族会@日立',
      date: '2023-01-06 ~ 2023-01-07',
      place: '釜飯と串焼 とりでん 日立多賀店',
      lat: 36.557229,
      lng: 140.629611
    },
    {
      id: 13,
      title: '夏の豪族会',
      date: '2023-08-26',
      place: '四季彩 -shikisai- 品川港南口店',
      lat: 35.628488,
      lng: 139.743209
    },
    {
      id: 14,
      title: '豪族会 ~ 研究室',
      date: '2023-12-02',
      place: 'せせらぎを聴きながら 品川駅前店',
      lat: 35.628631,
      lng: 139.742403
    },
    {
      id: 15,
      title: '豪族会 H.I休日出勤の巻',
      date: '2024-09-07',
      place: '餃子マニア 品川本店',
      lat: 35.626815,
      lng: 139.737315
    },
    {
      id: 16,
      title: '豪族会 H.Iまたまた休日出勤の巻',
      date: '2025-01-18',
      place: '四文銭 品川店',
      lat: 35.629001,
      lng: 139.742967
    }
  ].reverse();
  map!: L.Map;

  ngOnInit(): void {
    this.map = L.map('map').setView([35.681236, 139.767125], 12);

    // set map tile
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // set markers
    this.schedules.forEach((schedule: Schedule) => {
      const marker = L.marker([schedule.lat, schedule.lng]).addTo(this.map);
      marker.bindPopup(`${schedule.place} (${schedule.date})`);
    });
  }
}
