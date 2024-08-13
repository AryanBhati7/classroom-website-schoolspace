import React from "react";

function PrincipalDashboard() {
  return (
    <div class="relative overflow-x-auto rounded-lg shadow-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-md uppercase bg-blue-500 text-white">
          <tr>
            <th scope="col" class="px-6 py-3">
              #
            </th>
            <th scope="col" class="px-6 py-3">
              Classroom Name
            </th>
            <th scope="col" class="px-6 py-3">
              Number of Students
            </th>
            <th scope="col" class="px-6 py-3">
              Assigned Teacher
            </th>
            <th scope="col" class="px-6 py-3">
              TimeTable Status
            </th>
          </tr>
        </thead>
        <tbody className="">
          <tr class="bg-white border-b">
            <td class="px-6 py-4">1</td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">Silver</td>
            <td class="px-6 py-4">Laptop</td>
            <td class="px-6 py-4">$2999</td>
          </tr>
          <tr class="bg-white border-b">
            <td class="px-6 py-4">2</td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Microsoft Surface Pro
            </th>
            <td class="px-6 py-4">White</td>
            <td class="px-6 py-4">Laptop PC</td>
            <td class="px-6 py-4">$1999</td>
          </tr>
          <tr class="bg-white">
            <td class="px-6 py-4">3</td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Magic Mouse 2
            </th>
            <td class="px-6 py-4">Black</td>
            <td class="px-6 py-4">Accessories</td>
            <td class="px-6 py-4">$99</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PrincipalDashboard;
