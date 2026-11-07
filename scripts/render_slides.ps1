param(
  [Parameter(Mandatory=$true)][string]$PptxPath,
  [Parameter(Mandatory=$true)][string]$OutDir
)

$resolvedPptx = (Resolve-Path $PptxPath).Path
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$resolvedOut = (Resolve-Path $OutDir).Path

$app = New-Object -ComObject PowerPoint.Application
$pres = $app.Presentations.Open($resolvedPptx, $true, $true, $false)
$i = 0
foreach ($slide in $pres.Slides) {
  $i++
  $num = $i.ToString("00")
  $outFile = Join-Path $resolvedOut ("s" + $num + ".png")
  $slide.Export($outFile, "PNG", 1600, 900)
}
$pres.Close()
Write-Output "Exported $i slides from $resolvedPptx to $resolvedOut"
