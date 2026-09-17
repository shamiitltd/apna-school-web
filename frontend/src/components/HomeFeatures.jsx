export const HomeFeatures = () => {
    return (
        <section className="border-b border-slate-100 bg-white" aria-label="Apna School benefits">
                <div className="mx-auto grid max-w-10xl grid-cols-2 gap-y-7 px-6 py-7 sm:grid-cols-3 sm:px-10 lg:grid-cols-5 lg:gap-4 lg:py-6">
                    {[
                        { label: <>Your Data in<br />Google Drive</>, icon: "https://cdn.simpleicons.org/googledrive" },
                        { label: <>Powered by<br />Google Sheets</>, icon: "https://cdn.simpleicons.org/googlesheets" },
                        { label: <>Secure Login with<br />Firebase</>, icon: "https://cdn.simpleicons.org/firebase" },
                        { label: <>Low Cost<br />High Value</>, icon: "https://cdn.simpleicons.org/cashapp" },
                        { label: <>Made for<br />100-1,000 Students</>, icon: "https://cdn.simpleicons.org/googleclassroom" },
                    ].map((benefit) => (
                        <div key={benefit.label.props.children.join("")} className="flex flex-col items-center text-center text-xs font-medium leading-4 text-slate-700 sm:text-sm">
                            <img src={benefit.icon} alt="" className="mb-2 h-8 w-8 object-contain" />
                            <span>{benefit.label}</span>
                        </div>
                    ))}
                </div>
            </section>
    )
}