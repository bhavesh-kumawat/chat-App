const Error = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <p style={{ opacity: "0.5" }}>Not found.</p>
    </div>
  );
};

export default Error;
