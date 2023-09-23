function TopInfoTools({ item }) {
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>Category</label>
        <p>{item.category}</p>
      </div>
      <div className="singleInfo">
        <label>Tech Assigned To</label>
        <p>{item.techAssigned}</p>
      </div>
      <div className="singleInfo">
        <label>Location</label>
        <p>{item.location}</p>
      </div>
      <div className="singleInfo">
        <label>Description</label>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default TopInfoTools;
