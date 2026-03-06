from django.contrib import admin
from .models import (
    Post, City, CitySlide, CityStats, Product, TechSpec,
    Division, District, Thana, ProductFeature, UserProfile
)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')
    search_fields = ('title', 'content')

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)

@admin.register(CitySlide)
class CitySlideAdmin(admin.ModelAdmin):
    list_display = ('city', 'title')
    search_fields = ('city', 'title')

@admin.register(CityStats)
class CityStatsAdmin(admin.ModelAdmin):
    list_display = ('city',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'price')
    search_fields = ('name', 'city')

@admin.register(TechSpec)
class TechSpecAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_name')
    search_fields = ('title',)

@admin.register(Division)
class DivisionAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('name', 'division')
    search_fields = ('name', 'division')

@admin.register(Thana)
class ThanaAdmin(admin.ModelAdmin):
    list_display = ('name', 'district')
    search_fields = ('name', 'district')

@admin.register(ProductFeature)
class ProductFeatureAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('phone', 'role', 'is_phone_verified', 'user')
    search_fields = ('phone', 'user__username')
    list_filter = ('role', 'is_phone_verified')
