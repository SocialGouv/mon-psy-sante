import * as Sentry from "@sentry/nextjs";
import { NextPageContext } from "next";
import NextErrorComponent, { ErrorProps as NextErrorProps } from "next/error";
import React from "react";

export type ErrorPageProps = {
  err: Error;
  statusCode: number;
  hasGetInitialPropsRun: boolean;
};

export type ErrorProps = {
  hasGetInitialPropsRun: boolean;
} & NextErrorProps;

const MyError = ({
  statusCode,
  hasGetInitialPropsRun,
  err,
}: ErrorPageProps) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

MyError.getInitialProps = async (
  props: NextPageContext
): Promise<ErrorProps> => {
  const { res, err, asPath } = props;

  const errorInitialProps = (await NextErrorComponent.getInitialProps({
    res,
    err,
  } as NextPageContext)) as ErrorProps;

  errorInitialProps.hasGetInitialPropsRun = true;

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return errorInitialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );
  await Sentry.flush(2000);

  return errorInitialProps;
};

export default MyError;
