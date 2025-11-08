param(
    [string]$Endpoint = "list",
    [string]$Slug = "",
    [int]$Limit = 10
)

$baseUrl = "http://localhost:8765/api/blog"

Write-Host "=== Blog API Test ===" -ForegroundColor Green
Write-Host ""

if ($Endpoint -eq "list") {
    Write-Host "Testing: Get Blog Posts List" -ForegroundColor Cyan
    $url = $baseUrl + "?locale=en&limit=" + $Limit
    Write-Host "URL: $url" -ForegroundColor Gray
    Write-Host ""
    
    $response = curl.exe -s $url
    $json = $response | ConvertFrom-Json
    
    if ($json.success) {
        Write-Host "Success!" -ForegroundColor Green
        Write-Host "Total Posts: $($json.data.posts.Count)" -ForegroundColor Yellow
        Write-Host ""
        
        $json.data.posts | ForEach-Object {
            Write-Host "ID: $($_.id)" -ForegroundColor Yellow
            Write-Host "   Title: $($_.title)" -ForegroundColor White
            Write-Host "   Slug: $($_.slug)" -ForegroundColor Gray
            Write-Host "   Featured Image: $($_.image)" -ForegroundColor Cyan
            Write-Host "   Author: $($_.author.name)" -ForegroundColor Magenta
            Write-Host "   Author Photo: $($_.author.photo)" -ForegroundColor Magenta
            Write-Host "   Date: $($_.date)" -ForegroundColor Gray
            Write-Host "   Category: $($_.category)" -ForegroundColor Gray
            Write-Host "   Reading Time: $($_.readingTime) minutes" -ForegroundColor Gray
            Write-Host ""
        }
    } else {
        Write-Host "Error: $($json.error)" -ForegroundColor Red
    }
}
elseif ($Endpoint -eq "single") {
    if ([string]::IsNullOrEmpty($Slug)) {
        Write-Host "Error: Slug is required for single post" -ForegroundColor Red
        Write-Host "Usage: .\test-blog-api.ps1 -Endpoint single -Slug 'post-slug'" -ForegroundColor Yellow
        exit
    }
    
    Write-Host "Testing: Get Single Blog Post" -ForegroundColor Cyan
    Write-Host "URL: $baseUrl/$Slug" -ForegroundColor Gray
    Write-Host ""
    
    $response = curl.exe -s "$baseUrl/$Slug"
    $json = $response | ConvertFrom-Json
    
    if ($json.success) {
        Write-Host "Success!" -ForegroundColor Green
        Write-Host ""
        
        $post = $json.data.post
        
        Write-Host "ID: $($post.id)" -ForegroundColor Yellow
        Write-Host "   Title: $($post.title)" -ForegroundColor White
        Write-Host "   Slug: $($post.slug)" -ForegroundColor Gray
        Write-Host "   Featured Image: $($post.image)" -ForegroundColor Cyan
        Write-Host "   Author: $($post.author.name)" -ForegroundColor Magenta
        Write-Host "   Author Photo: $($post.author.photo)" -ForegroundColor Magenta
        Write-Host "   Date: $($post.date)" -ForegroundColor Gray
        Write-Host "   Category: $($post.category)" -ForegroundColor Gray
        Write-Host "   Reading Time: $($post.readingTime) minutes" -ForegroundColor Gray
        if ($post.excerpt) {
            $excerptLength = [Math]::Min(100, $post.excerpt.Length)
            Write-Host "   Excerpt: $($post.excerpt.Substring(0, $excerptLength))..." -ForegroundColor Gray
        }
        Write-Host ""
    } else {
        Write-Host "Error: $($json.error)" -ForegroundColor Red
    }
}
else {
    Write-Host "Invalid endpoint. Use 'list' or 'single'" -ForegroundColor Red
}
