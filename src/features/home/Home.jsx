import { Quote } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card.jsx";
import { useGetRandomQuotesQuery } from "../quotes/quoteApi.js"
import { Button } from "../../components/ui/button.jsx";
import { Spinner } from "../../components/ui/spinner.jsx";

export default function Home() {

  const { isLoading, data, error, refetch, isFetching } = useGetRandomQuotesQuery();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }
  console.log(data);

  return (

    <div className="min-h-screen w-full   p-6">
      <Button
        disabled={isFetching}

        onClick={refetch}
        className="mb-3">

        {isFetching ? <Spinner /> : "New Quote"}
      </Button>
      <div className="w-full max-w-2xl animate-fadeIn">
        <Card className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-8 space-y-6">
            {/* Quote icon */}
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-slate-800/70 border border-slate-700">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>


            {/* Quote text */}
            <p className="text-center text-lg md:text-xl leading-relaxed font-medium text-slate-100">
              “{data.content}”
            </p>


            {/* Author */}
            <div className="text-center">
              <p className="text-base font-semibold text-slate-200">
                — {data.author}
              </p>
            </div>

            <p className="text-white">{data.originator.description}</p>


            {/* Tags (without Badge component) */}
            <div className="flex flex-wrap justify-center gap-2">
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>


            {/* Source link */}
            <div className="text-center pt-2">
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-slate-200 underline underline-offset-4 transition"
              >
                View original source
              </a>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Simple fade-in animation using Tailwind's arbitrary styles */}
      <style>{`
.animate-fadeIn {
animation: fadeIn 0.6s ease-out;
}
@keyframes fadeIn {
from {
opacity: 0;
transform: translateY(30px);
}
to {
opacity: 1;
transform: translateY(0);
}
}
`}</style>
    </div>
  );
}
