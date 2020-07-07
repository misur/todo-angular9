import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
  description: string;
  complete: boolean;
}

export interface DialogData {
  name: string;
  description: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-root',
  templateUrl: './to-do.component.html',
  styleUrls: ['./app.component.css']
})
export class ToDoComponent implements OnInit {
  pageSize = 10;
  value = '';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  name: string;
  description: string;

  displayedColumns: string[] = ['complete', 'id', 'name', 'progress', 'description', 'action'];
  dataSource: MatTableDataSource<UserData>;


  constructor(public dialog: MatDialog, private toastr: ToastrService, private _snackbar: MatSnackBar) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }


  onclick() {
    window.alert('test');
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      data: {name: this.name, description: this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      this._snackbar.open('Successfully added', result.description, {
        duration: 2000,
      });
      console.log(`Dialog result: ${result}`);
      this.dataSource.data.push({
        color: null,
        description: result.description,
        id: new Date().getTime().toString(),
        progress: '0',
        name: result.name,
        complete: false
      });
      this.dataSource.paginator = this.paginator;
    });
  }

  remove(row) {
    const dsData = this.dataSource.data;
    const itemIndex = dsData.findIndex(obj => obj.id === row.id);
    this.dataSource.data.splice(itemIndex, 1);
    this.dataSource.paginator = this.paginator;
    this._snackbar.open('Removed', row.description, {
      duration: 2000,
    });
  }

  updateTaskCompleted(row) {
    row.progress = 100;
    this._snackbar.open('Completed',
      row.description, {duration: 2000});
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
    description: 'test',
    complete: false
  };
}

@Component({
  selector: 'app-add-new-task-dialog',
  templateUrl: './dialogs/add-new-task-dialog.html',
})
export class DialogContentExampleDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

}
