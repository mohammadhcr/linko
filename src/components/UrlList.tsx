import CopyURL from "./CopyURL";
import "../styles/UrlList.scss";

interface Item {
  orgLink: string;
  newUrl: string;
}

const UrlList = ({ urlList }: { urlList: Item[] }) => {
  return (
    <>
      {urlList.length ? (
        <div className="url-list">
          <h2>لینک‌های اخیر:</h2>
          {urlList.map((item) => (
            <div className="url-item" key={item.newUrl}>
              <div className="links">
                <span title={item.orgLink} className="orglink">
                  {item.orgLink.slice(0, 32) + "..."}
                </span>
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.newUrl}`}
                  className="shortlink"
                  target="_blank"
                >
                  {process.env.NEXT_PUBLIC_SITE_URL}/{item.newUrl}
                </a>
              </div>
              <span className="tools">
                <CopyURL shortcode={item.newUrl} />
              </span>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UrlList;
