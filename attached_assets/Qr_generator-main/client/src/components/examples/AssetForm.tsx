import AssetForm from '../AssetForm';

export default function AssetFormExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <AssetForm
        onSubmit={(data) => console.log('Form submitted:', data)}
        defaultUsername="admin"
      />
    </div>
  );
}
