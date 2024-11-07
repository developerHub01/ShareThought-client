import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { convertNumberToWords } from "@/utils";
import Link from "next/link";

const summaryCoutList = [
  {
    id: "summary",
    label: "Reactions",
    count: 7800,
  },
  {
    id: "read_time",
    label: "read time (hours)",
    count: 7800,
  },
];

const topPostList = [
  {
    id: "1",
    title:
      "this is first post title this is first post title this is first post title this is first post title",
    views: 50,
    url: "/",
  },
  {
    id: "2",
    title: "this is two post title",
    views: 78,
    url: "/",
  },
  {
    id: "3",
    title: "this is three post title",
    views: 60,
    url: "/",
  },
];

const AnalyticsSummery = () => {
  return (
    <div className="border rounded-sm p-5 gap-4 flex flex-col">
      <AnalyticsTop />
      <Separator />
      <AnalyticsSummary />
      <Separator />
      <AnalyticsTopPosts />

      <Link href={"/"}>
        <Button size={"sm"} variant="outline">
          Go to channel analytics
        </Button>
      </Link>
    </div>
  );
};

const AnalyticsTop = () => {
  return (
    <>
      <h4 className="pb-1 text-lg font-semibold">Channel analytics</h4>
      <div className="flex flex-col justify-center">
        <p className="text-sm text-gray-500 leading-relaxed">
          Current subscribers
        </p>
        <p className="text-3xl text-primary leading-relaxed">1,352</p>
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className={`text-green-500`}>+7 </span>
          in last 30 days
        </p>
      </div>
    </>
  );
};

const AnalyticsSummary = () => {
  return (
    <div className="flex flex-col justify-center gap-2.5">
      <div className="flex flex-col gap-0.5">
        <h5 className="text-base leading-relaxed">Summary</h5>
        <p className="text-xs text-gray-500 leading-relaxed">last 30 days</p>
      </div>
      <ul className="flex flex-col gap-2 capitalize">
        {summaryCoutList.map(({ id, label, count }) => {
          const contextCount = convertNumberToWords(count);

          return (
            <li
              key={id}
              className="flex justify-between items-center gap-2 text-sm"
            >
              <p>{label}</p>
              <p>{contextCount}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const AnalyticsTopPosts = () => {
  return (
    <div className="flex flex-col justify-center gap-2.5">
      <div className="flex flex-col gap-0.5">
        <h5 className="text-base leading-relaxed">Top posts</h5>
        <p className="text-xs text-gray-500 leading-relaxed">
          Last 48 hours · Reactions
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        {topPostList.map(({ id, title, views, url }) => {
          const viewCount = convertNumberToWords(views);

          return (
            <li key={id}>
              <Link
                href={url}
                className="flex justify-between items-center gap-2 text-sm overflow-hidden"
              >
                <p className="line-clamp-1 overflow-hidden text-ellipsis">
                  {title}
                </p>
                <p>{viewCount}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AnalyticsSummery;
