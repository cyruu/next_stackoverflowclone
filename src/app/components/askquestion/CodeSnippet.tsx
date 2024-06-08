"use client";
import React, { useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
const CodeSnippet = ({
  register,
  control,
  errors,
  className,
  ...props
}: any) => {
  const [text, setText] = useState("");
  return (
    <Paper className="p-2 my-8 border border-gray-300 sm:p-5" elevation={0}>
      <Typography variant="body1" className="font-bold">
        Add your Code Snippet.
      </Typography>
      <Typography className="font-light text-xs mt-1">
        Describe your code and what are to trying to achive.
      </Typography>
      <textarea
        className={className}
        {...props}
        // className="text-xs p-2 rounded-md outline-blue-400 w-full my-3 border broder-gray-500"
        {...register("codesnippetdetail")}
      ></textarea>
      {errors.expect ? (
        <p className="text-xs mt-1 text-red-600">
          {errors.codesnippetdetail.message}
        </p>
      ) : (
        ""
      )}
      <Controller
        name="codesnippetcode"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Editor
            {...register("codesnippetcode")}
            apiKey="6hqc6igd87d377ipfccddmmun7oc984xw6edkiomslwhef5s"
            id="myid"
            onEditorChange={(newValue, editor) => {
              onChange(newValue);
            }}
            init={{
              height: 300,
              default_format: "code",
              content_style: "body { font-size: 13px; }",
            }}
          />
        )}
      />
      <div>{text}</div>
    </Paper>
  );
};

export default CodeSnippet;
