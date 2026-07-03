import AssetUploadCard from "@/components/admin/AssetUploadCard";
import { PageHeader } from "@/components/admin/FormField";
import { getAllAssetMeta } from "@/lib/assets";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function AdminAssetsPage() {
  const assets = await getAllAssetMeta();

  return (
    <div>
      <PageHeader
        title="Assets"
        description="Upload your resume PDF and profile photo. They appear on the public site automatically."
      />

      <div className="grid grid-cols-1 gap-6">
        <AssetUploadCard
          assetKey="resume"
          title="Resume (PDF)"
          description="PDF only, up to 5MB. Used by the Download CV buttons on the home and about pages."
          accept="application/pdf,.pdf"
          asset={assets.resume}
          publicPath={siteConfig.resumePath}
        />
        <AssetUploadCard
          assetKey="photo"
          title="Profile photo"
          description="JPEG, PNG, or WebP, up to 2MB. Shown in the portrait area on the about page."
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          asset={assets.photo}
          publicPath={siteConfig.photoPath}
        />
      </div>
    </div>
  );
}
