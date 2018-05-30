import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { EventViewModel } from '@app/content/models';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  displayedColumns = ['cam', 'task', 'relay', 'createdAt', 'latency'];

  pageSizeOptions = [8, 13, 21];

  dataSource: MatTableDataSource<EventViewModel>;

  @Input() models: EventViewModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<EventViewModel>(this.models);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  onExport() {
    console.log(this.dataSource.filteredData);
  }
}
