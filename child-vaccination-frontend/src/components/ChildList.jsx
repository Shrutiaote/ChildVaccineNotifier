
function ChildList({ children = [], setChildren }) {
  return (
    <div>
      <h2>Registered Children</h2>

      {children.length === 0 ? (
        <p>No children registered yet.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Child Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Parent Name</th>
              <th>Parent Phone</th>
              <th>Parent Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {children.map((child) => (
              <tr key={child.id}>
                <td>{child.id}</td>
                <td>{child.name}</td>
                <td>{child.dateOfBirth}</td>
                <td>{child.gender}</td>
                <td>{child.parentName}</td>
                <td>{child.parentPhone}</td>
                <td>{child.parentEmail}</td>
                <td>
                <button
                   onClick={() => {
                   window.alert(`Edit child ID: ${child.id}`);
                  }}
                  >Edit
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ChildList;
