export const dashboard = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin Dashboard Access Granted",
  });
};