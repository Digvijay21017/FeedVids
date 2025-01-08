import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoader({ loading }) {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent className="bg-white">
            <AlertDialogTitle/>
          <div className="bg-white flex flex-col items-center my-10 justify-center">
            <Image src={"/load-time.gif"} width={100} height={100} unoptimized alt="loading gif"/>
            <h2>Generating your video... Do not refresh</h2>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CustomLoader;
