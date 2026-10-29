import DataGrid from './components/DataGrid';
import { employees, type Employee } from './data/employees';
import type { ColumnDef } from './types/data-grid-contract';

const columns: ColumnDef<Employee>[] = [
  { header: 'Name', accessorKey: 'name', sortable: true },
  { header: 'Department', accessorKey: 'department', sortable: true },
  { header: 'Role', accessorKey: 'role' },
  { header: 'Salary (USD)', accessorKey: 'salary', sortable: true },
  { header: 'Start date', accessorKey: 'startDate', sortable: true },
];

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header>
        <h1>Employee Directory</h1>
      </header>
      <main id="main-content">
        <DataGrid data={employees} columns={columns} ariaLabel="Employees" />
      </main>
    </>
  );
}
