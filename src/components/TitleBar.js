export default function TitleBar(props) {
  const { title, subtitle } = props;
// console.log(props);
  return (
    <div className="content-title-bar text-center mb-4">
      <h2 className="content-title d-inline-block fs-4 title-bgc-secondary title-spacing">
        {title}
      </h2>

      {
        subtitle &&
        <small className="fw-bold d-block">
          {subtitle}
        </small>
      }
    </div>
  );
}