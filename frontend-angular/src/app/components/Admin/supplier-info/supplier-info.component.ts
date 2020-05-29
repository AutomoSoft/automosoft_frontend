import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.scss']
})
export class SupplierInfoComponent implements OnInit {
  displayedColumns: string[] = ['supplierid', 'name', 'items', 'registeredon','action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
export interface PeriodicElement {
  supplierid: string;
  name: string;
  items: string;
  registeredon: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Yasindi', supplierid: 'U001', items: 'Paint', registeredon:'', action: ''},
  {name: 'Lalinda', supplierid: 'A001', items: 'Tools', registeredon:'', action: ''},


];
