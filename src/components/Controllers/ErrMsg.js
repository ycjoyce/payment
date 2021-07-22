export default function ErrMsg({ meta }) {
  if (!meta || (!meta.error || !meta.touched)) {
    return null;
  }
  return (
    <small className="error-msg text-danger d-block mt-1">
      {meta.error}
    </small>
  );
}