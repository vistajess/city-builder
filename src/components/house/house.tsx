export const House = () => {
  return (
    <div>
      <h1>House</h1>
      <House.Floor />
    </div>
  );
};

House.Floor = () => {
  return (
    <div>
      <h1>Floor</h1>
    </div>
  );
};
