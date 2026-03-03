import React from "react";
import Card from "../components/Card";

type Child = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string; // ISO
  admissionDate: string; // ISO
  status: string;
  guardianInfo?: string;
  notes?: string;
};

const initialData: Child[] = [
  {
    id: 1,
    firstName: "Amina",
    lastName: "Khan",
    gender: "Female",
    dateOfBirth: "2018-05-12",
    admissionDate: "2020-09-01",
    status: "Active",
    guardianInfo: "Mrs. Khan, 555-1234",
    notes: "No known allergies",
  },
  {
    id: 2,
    firstName: "Samuel",
    lastName: "Okoro",
    gender: "Male",
    dateOfBirth: "2019-02-20",
    admissionDate: "2021-01-15",
    status: "Graduated",
    guardianInfo: "Mr. Okoro, 555-5678",
    notes: "Vegetarian",
  },
  {
    id: 3,
    firstName: "Lina",
    lastName: "Fernandez",
    gender: "Female",
    dateOfBirth: "2017-11-03",
    admissionDate: "2019-06-30",
    status: "Transferred",
    guardianInfo: "Mrs. Fernandez, 555-8765",
    notes: "Asthmatic",
  },
];

const ChildrenPage: React.FC = () => {
  const [children, setChildren] = React.useState<Child[]>(initialData);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Child | null>(null);

  // search/sort/pagination
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortKey, setSortKey] = React.useState<keyof Child | null>(null);
  const [sortAsc, setSortAsc] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    admissionDate: "",
    status: "Active",
  });

  function openAdd() {
    setEditing(null);
    setForm({
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      admissionDate: "",
      status: "Active",
    });
    setModalOpen(true);
  }

  function openEdit(child: Child) {
    setEditing(child);
    setForm({
      firstName: child.firstName,
      lastName: child.lastName,
      gender: child.gender,
      dateOfBirth: child.dateOfBirth,
      admissionDate: child.admissionDate,
      status: child.status,
    });
    setModalOpen(true);
  }

  function save() {
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const gender = form.gender;
    const dateOfBirth = form.dateOfBirth;
    const admissionDate = form.admissionDate;
    const status = form.status as "Active" | "Adopted" | "Transferred";
    if (!firstName || !lastName) return;

    if (editing) {
      setChildren((prev) =>
        prev.map((c) =>
          c.id === editing.id
            ? {
                ...c,
                firstName,
                lastName,
                gender,
                dateOfBirth,
                admissionDate,
                status,
              }
            : c,
        ),
      );
    } else {
      const nextId = children.length
        ? Math.max(...children.map((c) => c.id)) + 1
        : 1;
      setChildren((prev) => [
        ...prev,
        {
          id: nextId,
          firstName,
          lastName,
          gender,
          dateOfBirth,
          admissionDate,
          status,
        },
      ]);
    }

    setModalOpen(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={openAdd}
            className="inline-flex items-center px-4 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 cursor-pointer"
          >
            Add New Child
          </button>
        </div>
      </div>

      <div className="w-full">
        <Card title="Children List">
          {/* search and pagination controls */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="border rounded px-3 py-1 w-full sm:w-64"
            />
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm">Page {page}</span>
              <button
                disabled={page * pageSize >= children.length}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left  px-3 py-2 text-gray-600">
              <thead>
                <tr className="border-t bg-taupe-200">
                  <th className="px-3 py-1 ">Sn</th>
                  {[
                    "firstName",
                    "lastName",
                    "gender",
                    "dateOfBirth",
                    "admissionDate",
                    "status",
                  ].map((key) => (
                    <th
                      key={key}
                      className="px-3 py-1 cursor-pointer"
                      onClick={() => {
                        if (sortKey === key) setSortAsc(!sortAsc);
                        else {
                          setSortKey(key as keyof Child);
                          setSortAsc(true);
                        }
                      }}
                    >
                      {key === "firstName"
                        ? "First Name"
                        : key === "lastName"
                          ? "Last Name"
                          : key === "dateOfBirth"
                            ? "DOB"
                            : key === "admissionDate"
                              ? "Admitted"
                              : key.charAt(0).toUpperCase() + key.slice(1)}
                      {sortKey === key && (sortAsc ? " ▲" : " ▼")}
                    </th>
                  ))}
                  <th className="px-3 py-1 ">Note</th>
                  <th className="px-3 py-1 ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  // filter
                  let list = children.filter((c) =>
                    [`${c.firstName} ${c.lastName}`, c.status]
                      .join(" ")
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  );
                  // sort
                  if (sortKey) {
                    list = [...list].sort((a, b) => {
                      const av = a[sortKey] || "";
                      const bv = b[sortKey] || "";
                      if (av < bv) return sortAsc ? -1 : 1;
                      if (av > bv) return sortAsc ? 1 : -1;
                      return 0;
                    });
                  }
                  // paginate
                  const start = (page - 1) * pageSize;
                  list = list.slice(start, start + pageSize);
                  return list;
                })().map((c, idx) => (
                  <tr key={c.id} className="border-t">
                    <td className="px-3 py-1 ">{idx + 1}</td>
                    <td className="px-3 py-1 ">{c.firstName}</td>
                    <td className="px-3 py-1 ">{c.lastName}</td>
                    <td className="px-3 py-1 ">{c.gender}</td>
                    <td className="px-3 py-1">{c.dateOfBirth}</td>
                    <td className="px-3 py-1">{c.admissionDate}</td>
                    <td className="px-3 py-1 ">{c.status}</td>
                    <td className="px-3 py-1">{c.notes || "-"}</td>
                    <td className="px-3 py-1 ">
                      <button
                        onClick={() => openEdit(c)}
                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 mr-2 cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-lg shadow p-6 z-10">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? "Edit Child" : "Add New Child"}
            </h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block  text-gray-700">First Name</label>
                  <input
                    value={form.firstName}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, firstName: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block  text-gray-700">Last Name</label>
                  <input
                    value={form.lastName}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, lastName: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block  text-gray-700">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, gender: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block  text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, dateOfBirth: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block  text-gray-700">Admission Date</label>
                  <input
                    type="date"
                    value={form.admissionDate}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, admissionDate: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block  text-gray-700">Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, status: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                >
                  <option>Active</option>
                  <option>Adopted</option>
                  <option>Transferred</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildrenPage;
