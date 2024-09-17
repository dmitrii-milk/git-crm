export const AuthFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        padding: 24,
        border: '1px solid black',
        borderRadius: 10,
        width: 250,
      }}
    >
      {children}
    </div>
  );
};
