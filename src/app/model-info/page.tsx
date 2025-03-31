"use client";

import { useGetModelInfo } from "@/hooks/useInferenceHooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";

const ModelInfoPage = () => {
  const { data, isLoading, isError, error } = useGetModelInfo();

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/inference">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Model Information</h1>
      </div>

      {isLoading && (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.message || "Failed to load model information"}</AlertDescription>
        </Alert>
      )}

      {data?.success && data.data && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Project Name</dt>
                  <dd className="text-lg font-semibold">{data.data.project.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Owner</dt>
                  <dd>{data.data.project.owner}</dd>
                </div>
                {data.data.project.impulse_name && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Impulse Name</dt>
                    <dd>{data.data.project.impulse_name}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Deploy Version</dt>
                  <dd>{data.data.project.deploy_version}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.data.properties.labels && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Labels</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.data.properties.labels.map((label: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm capitalize"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(data.data.properties)
                    .filter(
                      ([key]) =>
                        !["labels", "thresholds"].includes(key) && typeof data.data.properties[key] !== "object",
                    )
                    .map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-muted-foreground">
                          {key
                            .split("_")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </dt>
                        <dd className="font-medium">{typeof value === "boolean" ? (value ? "Yes" : "No") : value}</dd>
                      </div>
                    ))}
                </div>

                {data.data.properties.thresholds && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Thresholds</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              ID
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Min Score
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {data.data.properties.thresholds.map((threshold, index: number) => (
                            <tr key={index}>
                              <td className="px-4 py-2 whitespace-nowrap">{threshold.id}</td>
                              <td className="px-4 py-2 whitespace-nowrap">{threshold.type}</td>
                              <td className="px-4 py-2 whitespace-nowrap">{threshold.min_score}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ModelInfoPage

