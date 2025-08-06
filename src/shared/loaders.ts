/* eslint-disable qwik/loader-location */
import { routeLoader$ } from "@qwik.dev/router";
import moment from "moment";
// import { prisma } from "~/lib/prismaClient";
// import { PrismaClient } from "@prisma/client";
import { prisma } from '~/lib/prisma.server';

export const useLoadEditExtrasondaggio = routeLoader$(async () => {

  const data = await prisma.editExtrasondaggio.findMany({
    where: { data: { gte: moment().utc().startOf("day").toDate() } },
    orderBy: { data: "desc" },
    take: 1,
  });
  // console.debug("load data", data);
  if (data.length <= 0) return null;

  return data[0];
});
