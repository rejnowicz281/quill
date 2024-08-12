import debug from "@/lib/utils/general/debug";
import imagekit from "@/lib/utils/general/imagekit";

export default async function uploadAvatar(avatarFile: FormDataEntryValue | null) {
    if (!(avatarFile instanceof File) || (avatarFile.size <= 0 && !avatarFile.type.startsWith("image"))) return null;

    const fileBuffer = await avatarFile.arrayBuffer();

    try {
        const result = await imagekit.upload({
            file: Buffer.from(fileBuffer),
            fileName: avatarFile.name,
            folder: "/quill/avatars",
            transformation: {
                pre: "h-200,w-200,c-force"
            }
        });

        debug.log("photo upload result", result);

        return result.url;
    } catch (e) {
        return null;
    }
}
