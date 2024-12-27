"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddNewBlog({
  openDialog,
  setOpenDialog,
  loading,
  blogFormData,
  setBlogFormData,
  handleSaveBlogData,
}) {
  return (
    <div>
      <div>
        <Button onClick={() => setOpenDialog(true)}>Add New Blog</Button>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Blog</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>
                <Input
                  name="title"
                  placeholder="Enter blog title"
                  value={blogFormData.title}
                  onChange={(event) =>
                    setBlogFormData({
                      ...blogFormData,
                      title: event.target.value,
                    })
                  }
                  id="title"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Description
                </Label>
                <Input
                  name="description"
                  placeholder="Enter description"
                  value={blogFormData.description}
                  onChange={(event) =>
                    setBlogFormData({
                      ...blogFormData,
                      description: event.target.value,
                    })
                  }
                  id="description"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveBlogData} type="submit">
                {loading ? "Adding" : "Add Blog"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
