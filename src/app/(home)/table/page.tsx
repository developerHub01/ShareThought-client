import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usersList } from "./_data/userList";

const header = [
  {
    id: "fullName",
    label: "Full Name",
    sortable: true,
  },
  {
    id: "email",
    label: "Email",
    sortable: true,
  },
  {
    id: "phone",
    label: "Phone Number",
    sortable: true,
  },
  {
    id: "image",
    label: "Profile Picture",
    center: true,
  },
  {
    id: "gender",
    label: "Gender",
  },
  {
    id: "role",
    label: "Role",
  },
];

const UserPage = () => {
  return (
    <section className="w-full max-w-6xl mx-auto p-5">
      <section className="flex justify-between">
        <h1 className="text-2xl font-bold">User list</h1>
      </section>
      <section className="flex justify-between">
        <div>
          <Input />
        </div>
      </section>
      <div className="w-full overflow-auto">
        <ScrollArea className="">
          <div>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  {header.map(({ id, label, sortable, center }) => (
                    <TableHead
                      key={id}
                      // sortable={sortable}
                      // center={center}
                      className="capitalize whitespace-nowrap"
                    >
                      {label}
                    </TableHead>
                  ))}
                  {header.map(({ id, label, sortable, center }) => (
                    <TableHead
                      key={id}
                      // sortable={sortable}
                      // center={center}
                      className="capitalize whitespace-nowrap"
                    >
                      {label}
                    </TableHead>
                  ))}
                  {header.map(({ id, label, sortable, center }) => (
                    <TableHead
                      key={id}
                      // sortable={sortable}
                      // center={center}
                      className="capitalize whitespace-nowrap"
                    >
                      {label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersList
                  .slice(0, 5)
                  .map(
                    ({ id, fullName, email, phone, image, gender, role }) => (
                      <TableRow
                        key={id}
                        className="hover:bg-gray-200/60 duration-100 transition-all"
                      >
                        <TableCell className="font-medium">
                          {fullName}
                        </TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{phone}</TableCell>
                        <TableCell className="text-right">
                          <img
                            src={image}
                            alt=""
                            className="size-9 rounded-full object-cover mx-auto select-none"
                          />
                        </TableCell>
                        <TableCell>{gender}</TableCell>
                        <TableCell>{role}</TableCell>
                        <TableCell className="font-medium">
                          {fullName}
                        </TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{phone}</TableCell>
                        <TableCell className="text-right">
                          <img
                            src={image}
                            alt=""
                            className="size-9 rounded-full object-cover mx-auto select-none"
                          />
                        </TableCell>
                        <TableCell>{gender}</TableCell>
                        <TableCell>{role}</TableCell>
                        <TableCell className="font-medium">
                          {fullName}
                        </TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{phone}</TableCell>
                        <TableCell className="text-right">
                          <img
                            src={image}
                            alt=""
                            className="size-9 rounded-full object-cover mx-auto select-none"
                          />
                        </TableCell>
                        <TableCell>{gender}</TableCell>
                        <TableCell>{role}</TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="w-full justify-between"></div>
    </section>
  );
};

const Test = () => {
  return (
    <>
      <header className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">Card List</h1>
      </header>

      <div className="overflow-hidden">
        <div className="flex space-x-4 overflow-x-auto py-4">
          <div className="flex-none w-64 h-40 bg-blue-500 rounded-lg shadow-lg">
            {/* Card Content */}
            <p className="text-white p-4">Card 1</p>
          </div>
          <div className="flex-none w-64 h-40 bg-red-500 rounded-lg shadow-lg">
            {/* Card Content */}
            <p className="text-white p-4">Card 2</p>
          </div>
          <div className="flex-none w-64 h-40 bg-green-500 rounded-lg shadow-lg">
            {/* Card Content */}
            <p className="text-white p-4">Card 3</p>
          </div>
          <div className="flex-none w-64 h-40 bg-yellow-500 rounded-lg shadow-lg">
            {/* Card Content */}
            <p className="text-white p-4">Card 4</p>
          </div>
          <div className="flex-none w-64 h-40 bg-purple-500 rounded-lg shadow-lg">
            {/* Card Content */}
            <p className="text-white p-4">Card 5</p>
          </div>
          {/* Add more cards as needed */}
        </div>
      </div>
    </>
  );
};

export default UserPage;
