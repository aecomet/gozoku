import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Member } from '@src/types/Member.ts';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.scss',
  imports: [MatCardModule]
})
export class AppHome {
  members: Member[] = [
    {
      id: 1,
      name: '豪族',
      birth: '199x-xx-xx',
      note: '筆頭豪族',
      imagePath: 'gozoku_1.jpeg'
    },
    {
      id: 2,
      name: 'やんす 1',
      birth: '199x-xx-xx',
      note: 'やんす',
      imagePath: 'gozoku_2.jpeg'
    },
    {
      id: 3,
      name: 'やんす 2',
      birth: '199x-xx-xx',
      note: 'やんす',
      imagePath: 'gozoku_3.jpeg'
    },
    {
      id: 4,
      name: 'やんす 3',
      birth: '199x-xx-xx',
      note: 'やんす',
      imagePath: 'gozoku_4.jpeg'
    }
  ];
}
